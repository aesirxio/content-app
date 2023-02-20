import axios from 'axios';

const Entity = {
  Category: '&view=category_with_org_check_aesirx_categories_69',
  Tag: '&view=category_with_org_check_aesirx_tags_70',
  Item: '&view=item_with_org_check_aesirx_content_68',
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
      throw new Error('Entity was not created');
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
        }
      );
      if (restTo.statusCode != 200 || !restTo.result) {
        throw new Error('Entity was not created');
      }

      this.ref[entityName][resource.remote_key] = resource.id;
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
      if (restTo.statusCode != 201 || !restTo.result) {
        throw new Error('Entity was not created');
      }

      this.ref[entityName][resource.remote_key] = restTo.result.id;
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

      if (restRes.statusCode != 200 || !restRes.result) {
        throw new Error('Data not found');
      }
      this.setRemoteEntityId(localId, entityName, restRes.result._embedded.item[0].id);
    }

    return this.ref[entityName][localId];
  }
}

export { AesirX, Entity };
