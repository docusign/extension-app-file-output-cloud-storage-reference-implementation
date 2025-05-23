import { Immutable } from '../utils/types';

const paths = {
  Base: '/api',
  Write: {
    Base: '/',
    File: {
      Post: '/writefile',
    },
  },
  Auth: {
    Base: '/oauth',
    Authorize: {
      Get: '/authorize',
    },
    Token: {
      Post: '/token',
    },
    UserInfo: {
      Get: '/userinfo',
    },
  },
};

export type TPaths = Immutable<typeof paths>;
export default paths as TPaths;
