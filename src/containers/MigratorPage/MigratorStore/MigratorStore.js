// import {mergeData} from "../MigratorUtils/index"
import { AUTHORIZATION_KEY, Storage } from 'aesirx-dma-lib';

export default class MigratorStore {
  migratorData(aesirx_migrate_type, data) {
    const aesirx_bearer_token = Storage.getItem(AUTHORIZATION_KEY.ACCESS_TOKEN);
    // mergeData(aesirx_migrate_type, aesirx_bearer_token, data)
    console.log(aesirx_migrate_type, aesirx_bearer_token, data);
  }
}
