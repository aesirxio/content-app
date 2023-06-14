// import { isLogin } from 'auth';
import React, { lazy } from 'react';

import { LoginPage, ProfilePage, DigitalAssetsPage, history } from 'aesirx-uikit';

const ItemsPage = lazy(() => import('../containers/ItemsPage'));
const CategoriesPage = lazy(() => import('../containers/Categories'));
const ContentPage = lazy(() => import('../containers/ContentPage'));
const EditCategories = lazy(() => import('../containers/Categories/edit'));
const EditContent = lazy(() => import('../containers/ContentPage/edit'));
const EditItems = lazy(() => import('../containers/ItemsPage/edit'));

const authRoutes = [
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage text="PIM" />,
  },
];

const mainRoutes = [
  {
    path: '/',
    exact: true,
    main: () => <ItemsPage />,
  },
  {
    path: '/items-edit/:id',
    exact: true,
    main: ({ match }) => <EditItems match={match} />,
  },
  {
    path: '/items-create',
    exact: true,
    main: ({ match }) => <EditItems match={match} />,
  },
  {
    path: '/categories',
    exact: true,
    main: () => <CategoriesPage />,
  },
  {
    path: '/categories-edit/:id',
    exact: true,
    main: ({ match }) => <EditCategories match={match} />,
  },
  {
    path: '/categories-create',
    exact: true,
    main: () => <EditCategories />,
  },
  {
    path: '/dam',
    exact: true,
    main: () => <DigitalAssetsPage />,
  },
  {
    path: '/content',
    exact: true,
    main: () => <ContentPage />,
  },
  {
    path: '/content-edit/:id',
    exact: true,
    main: ({ match }) => <EditContent match={match} />,
  },
  {
    path: '/content-create',
    exact: true,
    main: () => <EditContent />,
  },
];

const settingRoutes = [
  {
    path: '/profile',
    exact: false,
    main: () => <ProfilePage />,
  },
];

const integrationRoutes = () =>
  mainRoutes
    .filter((item) => item.path !== '/digital-assets')
    .map((item) => {
      if (Array.isArray(item.path)) {
        item.path = item.path.map((path) => '/content' + path);
      } else {
        item.path = '/content' + item.path;
      }

      return item;
    });

const historyPush = (link) => {
  return history.push((process.env.REACT_APP_INTERGRATION ? '/content' : '') + link);
};

export { authRoutes, mainRoutes, settingRoutes, integrationRoutes, historyPush };
