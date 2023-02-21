import axios from 'axios';
import { Entity } from './aesirx';

const WORDPRESS_FIELDS = {
  URL: 'wordpress_api_url',
};
class Wordpress {
  wordpress_api_url;
  limit = 20;
  aesirx;

  constructor(aesirx, wordpress_api_url, limit = 20) {
    this.limit = limit;
    this.wordpress_api_url = wordpress_api_url;
    this.aesirx = aesirx;
  }

  async run(url, params, done) {
    let page = 1;
    let loop = true;
    while (loop) {
      const options = {
        acceptHeader: '*/*',
        additionalHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        params: {
          ...{
            per_page: this.limit,
            page: page,
            order: 'asc',
            orderby: 'id',
          },
          ...params,
        },
      };
      const restRes = await axios.get(this.wordpress_api_url + url, options);

      if (restRes.statusCode != 200 || restRes.result === null) {
        throw new Error('Data not found');
      }

      if (restRes.result.length == 0) {
        break;
      }

      // Probably less heavier for frontend executions
      // https://gist.github.com/joeytwiddle/37d2085425c049629b80956d3c618971#process-each-player-in-serial-using-arrayprototypereduce
      await restRes.result.reduce(async (prev, item) => {
        // Wait for the previous item to finish processing
        await prev;
        // Process this item
        await done(item);
      }, Promise.resolve());

      if (restRes.result.length < this.limit) {
        break;
      }

      page += 1;
    }
  }

  async runCategories() {
    let parents = [0];
    let loop = true;
    while (loop) {
      if (parents.length === 0) {
        break;
      }

      // @ts-ignore
      let parent = parents.pop();

      await this.run(
        '/wp-json/wp/v2/categories',
        {
          parent: parent,
        },
        async (item) => {
          const resource = {
            title: item.name,
            remote_key: item.id,
            description: item.description,
          };

          if (item.parent != 0) {
            resource.parent_id = await this.aesirx.getRemoteEntityId(item.parent, Entity.Category);
          }

          const remoteId = await this.aesirx.create(Entity.Category, resource);
          console.log(remoteId);
          parents.push(item.id);
        }
      );
    }
  }

  async runPosts() {
    await this.run('/wp-json/wp/v2/posts', {}, async (item) => {
      const resource = {
        title: item.title.rendered,
        metaverse_content: item.content.rendered,
        excerpt: item.excerpt.rendered,
        remote_key: item.id,

        // Empty tags and assign again later
        aesirx_tags: [],
      };

      if (item.categories.length) {
        resource.categories = [];

        for (const id of item.categories) {
          resource.categories.push(await this.aesirx.getRemoteEntityId(id, Entity.Category));
        }
      }

      const remoteId = await this.aesirx.create(Entity.Item, resource);

      for (const idx of item.tags) {
        await this.aesirx.addTag({
          content_id: remoteId,
          tag_id: await this.aesirx.getRemoteEntityId(idx, Entity.Tag),
        });
      }
    });
  }

  async runPages() {
    await this.run('/wp-json/wp/v2/pages', {}, async (item) => {
      const resource = {
        title: item.title.rendered,
        metaverse_content: item.content.rendered,
        excerpt: item.excerpt.rendered,
        remote_key: item.id,
      };

      const remoteId = await this.aesirx.create(Entity.Item, resource);
      console.log(remoteId);
    });
  }

  async runTags() {
    await this.run('/wp-json/wp/v2/tags', {}, async (item) => {
      const resource = {
        title: item.name,
        description: item.description,
        remote_key: item.id,
      };

      const remoteId = await this.aesirx.create(Entity.Tag, resource);
      console.log(remoteId);
    });
  }

  async runAll() {
    await this.runCategories();
    await this.runTags();
    await this.runPosts();
    await this.runPages();
  }
}

export { Wordpress, WORDPRESS_FIELDS };
