import { Joomla } from './joomla';
import { AesirX } from './aesirx';
import { Wordpress } from './wordpress';

const mergeData = (aesirx_migrate_type, aesirx_bearer_token, data) => {
  try {
    const aesirx = new AesirX(
      aesirx_bearer_token,
      process.env.REACT_APP_ENDPOINT_URL,
      aesirx_migrate_type
    );
    switch (aesirx_migrate_type) {
      case 'WORDPRESS':
        new Wordpress(aesirx, data?.wordpress_api_url).runAll();
        break;
      case 'JOOMLA':
      default:
        new Joomla(aesirx, data?.joomla_api_url, data?.joomla_bearer_token).runAll();
        break;
    }
  } catch (error) {
    console.error('Failed: ' + error.message);
  }
};
export { mergeData };
