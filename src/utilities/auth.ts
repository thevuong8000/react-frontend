import { AxiosRequestConfig } from 'axios';
import { APP_CONFIG } from '@constants/configs';

export interface AuthData {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  id?: string;
  account?: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  status?: string;
}

/**
 * Save login data into LocalStorage
 */
export const saveLoginInfo = (authData: AuthData) => {
  localStorage.setItem(APP_CONFIG.AUTH_DATA, JSON.stringify(authData));
};

/**
 * Clear login auth data in Localstorage
 */
export const clearLoginInfo = () => {
  localStorage.removeItem(APP_CONFIG.AUTH_DATA);
};

/**
 * Get login data from Localstorage
 */
export const getLoginInfo = (): AuthData =>
  JSON.parse(localStorage.getItem(APP_CONFIG.AUTH_DATA) as string) ?? {};

/**
 * Setup api config
 * @param {object} query Extra config
 */
export const getRequestConfig = (config: AxiosRequestConfig = {}) => {
  const { accessToken, tokenType } = getLoginInfo();
  const { headers = {} } = config;

  return {
    ...config,
    headers: {
      ...(accessToken ? { Authorization: `${tokenType} ${accessToken}` } : {}),
      ...headers
    }
  };
};
