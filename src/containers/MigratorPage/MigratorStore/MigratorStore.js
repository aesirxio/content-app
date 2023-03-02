import { AUTHORIZATION_KEY, Storage } from 'aesirx-dma-lib';
import { AesirX } from '../MigratorUtils/aesirx';
import { Joomla } from '../MigratorUtils/joomla';
import { Wordpress } from '../MigratorUtils/wordpress';

export default class MigratorStore {
  migratorData = async (aesirx_migrate_type, data, callbackSuccess, callbackError) => {
    try {
      const aesirx_bearer_token = Storage.getItem(AUTHORIZATION_KEY.ACCESS_TOKEN);
      const aesirx = new AesirX(
        aesirx_bearer_token,
        process.env.REACT_APP_ENDPOINT_URL,
        aesirx_migrate_type
      );
      switch (aesirx_migrate_type) {
        case 'WORDPRESS':
          await new Wordpress(aesirx, data?.wordpress_api_url).runAll();
          break;
        case 'JOOMLA':
        default:
          await new Joomla(aesirx, data?.joomla_api_url, data?.joomla_bearer_token).runAll();
          break;
      }
      callbackSuccess();
      return true;
    } catch (error) {
      console.log(error);
      callbackError();
      return false;
    }
  };
}
