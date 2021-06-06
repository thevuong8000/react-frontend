import { IRoute } from './constants';
export const EXTERNAL_LINK = {
  FACEBOOK: 'https://www.facebook.com/manh.beomap/',
  GITHUB: 'https://github.com/thevuong8000',
  LINKED_IN: 'https://www.linkedin.com/in/manh-tran-a003821a2/'
};

export const ROUTE: Record<any, IRoute> = {
  HOME: {
    to: '/home',
    title: 'Homepage'
  },
  LOGIN: {
    to: '/login',
    title: 'Login'
  },
  DEMO: {
    to: '/demo-components',
    title: 'Demo Components'
  }
};
