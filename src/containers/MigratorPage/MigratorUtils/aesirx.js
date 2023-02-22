import axios from 'axios';

const Entity = {
  Category: 'Category',
  Tag: 'Tag',
  Item: 'Item',
};

class AesirX {
  relatedAesirxUrl =
    '/index.php?option=reditem&webserviceClient=site&webserviceVersion=1.0.0&api=hal';

  constructor(aesirx_bearer_token, apiDomain, remotePrefix) {
    this.ref = {
      Category: {},
      Tag: {},
      Item: {},
    };
    this.entityUrlPart = {
      [Entity.Category]: '&view=category_with_org_check_aesirx_categories_69',
      [Entity.Tag]: '&view=category_with_org_check_aesirx_tags_70',
      [Entity.Item]: '&view=item_with_org_check_aesirx_content_68',
    };
    this.aesirx_bearer_token = aesirx_bearer_token;
    this.apiDomain = apiDomain;
    this.remotePrefix = remotePrefix;
  }
  setRemoteEntityId(localId, entityName, remoteKey) {
    this.ref[entityName][localId] = remoteKey;
  }

  async addTag(resource) {
    const restTo = await axios.post(
      this.apiDomain + this.relatedAesirxUrl + this.entityUrlPart[Entity.Item] + '&task=addTag',
      resource,
      {
        acceptHeader: '*/*',
        headers: {
          Authorization: 'Bearer ' + this.aesirx_bearer_token,
        },
      }
    );

    if (restTo.statusCode != 200 || !restTo.result) {
      console.warn('Entity was not created');
    }
  }

  async create(entityName, resource) {
    try {
      resource.id = await this.getRemoteEntityId(resource.remote_key, entityName);
    } catch (err) {
      console.log(err);
    }

    let use = { ...resource };
    use.remote_key = this.remotePrefix + '|' + use.remote_key;

    // Update
    if (resource.id) {
      const restTo = await axios.put(
        this.apiDomain + this.relatedAesirxUrl + this.entityUrlPart[entityName],
        use,
        {
          acceptHeader: '*/*',
          headers: {
            Authorization: 'Bearer ' + this.aesirx_bearer_token,
          },
        }
      );
      if (restTo.status != 200 || !restTo.data) {
        console.warn('Entity was not created');
      } else {
        this.ref[entityName][resource.remote_key] = resource.id;
      }
    }

    // Create
    else {
      const restTo = await axios.post(
        this.apiDomain + this.relatedAesirxUrl + this.entityUrlPart[entityName],
        use,
        {
          acceptHeader: '*/*',
          headers: {
            Authorization: 'Bearer ' + this.aesirx_bearer_token,
          },
        }
      );
      if (restTo.status != 201 || !restTo.data) {
        console.warn('Entity was not created');
      } else {
        this.ref[entityName][resource.remote_key] = restTo.data.id;
      }
    }

    return this.ref[entityName][resource.remote_key];
  }
  async getRemoteEntityId(localId, entityName) {
    if (!(localId in this.ref[entityName])) {
      const restRes = await axios.get(
        this.apiDomain +
          this.relatedAesirxUrl +
          this.entityUrlPart[entityName] +
          '&filter[remote_key]=' +
          this.remotePrefix +
          '|' +
          localId,
        {
          acceptHeader: '*/*',
          additionalHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          headers: {
            Authorization: 'Bearer ' + this.aesirx_bearer_token,
          },
        }
      );

      if (restRes.status != 200 || !restRes.data) {
        console.warn('Dont have remote entity');
      } else {
        this.setRemoteEntityId(localId, entityName, restRes.data._embedded.item[0].id);
      }
    }

    return this.ref[entityName][localId];
  }
}

export { AesirX, Entity };
