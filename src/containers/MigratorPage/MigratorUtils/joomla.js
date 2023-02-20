import axios from 'axios';
import { Entity } from './aesirx';

class Joomla {
  joomla_api_url;
  joomla_bearer_token;
  limit = 20;
  aesirx;
  constructor(aesirx, joomla_api_url, joomla_bearer_token, limit = 20) {
    this.limit = limit;
    this.joomla_bearer_token = joomla_bearer_token;
    this.joomla_api_url = joomla_api_url;
    this.aesirx = aesirx;
  }
  async run(url, params, done) {
    let offset = 0;
    let loop = true;

    while (loop) {
      const options = {
        acceptHeader: '*/*',
        headers: {
          Authorization: 'Bearer ' + this.joomla_bearer_token,
        },
        additionalHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        params: {
          ...{
            page: {
              limit: this.limit,
              offset: offset,
            },
            list: {
              ordering: 'id',
              direction: 'asc',
            },
          },
          ...params,
        },
      };
      const restRes = await axios.get(this.joomla_api_url + url, options);

      if (restRes.statusCode != 200 || !restRes.result) {
        throw new Error('Data not found');
      }

      // Probably less heavier for frontend executions
      // https://gist.github.com/joeytwiddle/37d2085425c049629b80956d3c618971#process-each-player-in-serial-using-arrayprototypereduce
      await restRes.result.data.reduce(async (prev, item) => {
        // Wait for the previous item to finish processing
        await prev;
        // Process this item
        await done(item);
      }, Promise.resolve());

      offset += this.limit;

      if (restRes.result.links.next === undefined) {
        break;
      }
    }
  }
  async runCategories() {
    await this.run(
      '/api/index.php/v1/content/categories',
      {
        list: {
          ordering: 'a.lft',
          direction: 'asc',
        },
      },
      async (item) => {
        const resource = {
          title: item.attributes.title,
          remote_key: item.id,
        };

        if (item.attributes.parent_id != 1) {
          resource.parent_id = await this.aesirx.getRemoteEntityId(
            item.attributes.parent_id,
            Entity.Category
          );
        }

        const remoteId = await this.aesirx.create(Entity.Category, resource);
        console.log(remoteId);
      }
    );
  }

  async runContents() {
    const options = {
      acceptHeader: '*/*',
    };

    await this.run(
      '/api/index.php/v1/content/articles',
      {
        list: {
          ordering: 'a.id',
          direction: 'asc',
        },
      },
      async (item) => {
        const resource = {
          title: item.attributes.title,
          metaverse_content: item.attributes.text,
          remote_key: item.id,

          // Empty tags and assign again later
          aesirx_tags: [],
        };

        resource.categories = [
          await this.aesirx.getRemoteEntityId(item.relationships.category.data.id, Entity.Category),
        ];

        const restRes = await this.from.get(
          '/api/index.php/v1/content/articles/' + item.id,
          options
        );

        if (restRes.statusCode != 200 || !restRes.result) {
          throw new Error('Data not found');
        }

        const remoteId = await this.aesirx.create(Entity.Item, resource);

        for (const idx in restRes.result.data.attributes.tags) {
          await this.aesirx.addTag({
            content_id: remoteId,
            tag_id: await this.aesirx.getRemoteEntityId(idx, Entity.Tag),
          });
        }
      }
    );
  }

  async runTags() {
    await this.run(
      '/api/index.php/v1/tags',
      {
        list: {
          ordering: 'a.lft',
          direction: 'asc',
        },
      },
      async (item) => {
        const resource = {
          title: item.attributes.title,
          description: item.attributes.description,
          remote_key: item.id,
        };

        if (item.attributes.parent_id != 1) {
          resource.parent_id = await this.aesirx.getRemoteEntityId(
            item.attributes.parent_id,
            Entity.Tag
          );
        }

        const remoteId = await this.aesirx.create(Entity.Tag, resource);
        console.log(remoteId);
      }
    );
  }

  async runAll() {
    await this.runCategories();
    await this.runTags();
    await this.runContents();
  }
}
export { Joomla };
