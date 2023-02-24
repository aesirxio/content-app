import axios from 'axios';
import { env } from 'env';
const postMessage = async (title, info, image = '') => {
  const slackHook = env.REACT_APP_SLACK_HOOK;
  const data = {
    attachments: [
      {
        color: '#e01e5a',
        author_name: window.location.href,
        title: title,
        text: info,
        fields: [
          {
            title: 'Priority',
            value: 'High',
            short: false,
          },
        ],
        image_url: image,
      },
    ],
  };

  return await axios.post(slackHook, data);
};

export default postMessage;
