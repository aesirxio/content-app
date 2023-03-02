import axios from 'axios';
import { Entity } from './aesirx';

const JOOMLA_FIELDS = {
  URL: 'joomla_api_url',
  TOKEN: 'joomla_bearer_token',
};

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
            'page[limit]': this.limit,
            'page[offset]': offset,
            'list[ordering]': 'id',
            'list[direction]': 'asc',
          },
          ...params,
        },
      };
      const restRes = await axios.get(this.joomla_api_url + url, options);
      if (restRes.status != 200 || !restRes?.data?.data) {
        break;
      }

      // Probably less heavier for frontend executions
      // https://gist.github.com/joeytwiddle/37d2085425c049629b80956d3c618971#process-each-player-in-serial-using-arrayprototypereduce
      await restRes.data.data.reduce(async (prev, item) => {
        // Wait for the previous item to finish processing
        await prev;
        // Process this item
        await done(item);
      }, Promise.resolve());

      offset += this.limit;

      if (!restRes?.data?.links?.next) {
        break;
      }
    }
  }
  async runCategories() {
    await this.run(
      '/api/index.php/v1/content/categories',
      {
        'list[ordering]': 'a.lft',
        'list[direction]': 'asc',
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
        await this.aesirx.create(Entity.Category, resource);
      }
    );
  }

  async runContents() {
    const options = {
      acceptHeader: '*/*',
      headers: {
        Authorization: 'Bearer ' + this.joomla_bearer_token,
      },
    };

    await this.run(
      '/api/index.php/v1/content/articles',
      {
        'list[ordering]': 'a.id',
        'list[direction]': 'asc',
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

        const restRes = await axios.get(
          this.joomla_api_url + '/api/index.php/v1/content/articles/' + item.id,
          options
        );
        if (restRes.status != 200 || !restRes.data) {
          console.log('Joomla dont have contents');
        } else {
          const remoteId = await this.aesirx.create(Entity.Item, resource);

          for (const idx in restRes.data.data.attributes.tags) {
            await this.aesirx.addTag({
              content_id: remoteId,
              tag_id: await this.aesirx.getRemoteEntityId(idx, Entity.Tag),
            });
          }
        }
      }
    );
  }

  async runTags() {
    await this.run(
      '/api/index.php/v1/tags',
      {
        'list[ordering]': 'a.lft',
        'list[direction]': 'asc',
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
        await this.aesirx.create(Entity.Tag, resource);
      }
    );
  }

  async runAll() {
    await this.runCategories();
    await this.runTags();
    await this.runContents();
  }
}
export { Joomla, JOOMLA_FIELDS };
