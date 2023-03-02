// import { isLogin } from 'auth';
import React, { lazy } from 'react';

const LoginPage = lazy(() => import('../containers/LoginPage'));
const WelcomePage = lazy(() => import('../containers/WelcomePage'));
const ItemsPage = lazy(() => import('../containers/ItemsPage'));
const ProfilePage = lazy(() => import('../containers/ProfilePage'));
const CategoriesPage = lazy(() => import('../containers/Categories'));
const DamPage = lazy(() => import('../containers/DamPage'));
const MigratorPage = lazy(() => import('../containers/MigratorPage'));
const ContentPage = lazy(() => import('../containers/ContentPage'));
const SettingPage = lazy(() => import('../containers/ItemsPage'));
const HelpCenterPage = lazy(() => import('../containers/ItemsPage'));
const EditCategories = lazy(() => import('../containers/Categories/edit'));
const EditContent = lazy(() => import('../containers/ContentPage/edit'));
const EditItems = lazy(() => import('../containers/ItemsPage/edit'));

const authRoutes = [
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage />,
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
    path: ['/migrator/joomla', '/migrator/wordpress'],
    exact: true,
    main: ({ match }) => <MigratorPage match={match} />,
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
    main: () => <DamPage />,
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
  {
    path: '/setting',
    exact: true,
    main: () => <SettingPage />,
  },
  {
    path: '/help-center',
    exact: true,
    main: () => <HelpCenterPage />,
  },
];

const settingRoutes = [
  {
    path: '/profile',
    exact: false,
    main: ({ match, location }) => <ProfilePage match={match} location={location} />,
  },
  {
    path: '/welcome',
    exact: true,
    main: () => <WelcomePage />,
  },
];

export { authRoutes, mainRoutes, settingRoutes };
