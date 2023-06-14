import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

const mainMenu = [
  {
    text: 'txt_menu_items',
    link: `/`,
    icons: '/assets/images/dashboard.svg',
    icons_color: '/assets/images/items.png',
  },
  {
    text: 'txt_menu_cate',
    link: `/categories`,
    icons: '/assets/images/cate_icon.png',
    icons_color: '/assets/images/cate_icon.png',
  },
  {
    text: 'txt_menu_dam',
    link: `/dam`,
    icons: '/assets/images/image.png',
    icons_color: '/assets/images/image.png',
  },
];

const settingMenu = [
  {
    name: 'profile',
    text: 'txt_menu_profile',
    link: '/profile',
    icons_fa: faUser,
  },
];

const profileMenu = [
  {
    key: 1,
    text: 'txt_profile',
    link: '/profile',
  },
];

export { profileMenu, mainMenu, settingMenu };
