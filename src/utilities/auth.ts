import { AxiosRequestConfig } from 'axios';
import { APP_CONFIG } from '@constants/configs';
import { IAuthData } from 'typings/user';

/**
 * Save login data into LocalStorage
 */
export const saveLoginInfo = (authData: IAuthData) => {
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
export const getLoginInfo = (): IAuthData =>
	JSON.parse(localStorage.getItem(APP_CONFIG.AUTH_DATA) as string) ?? {};

/**
 * Setup api config
 * @param {object} query Extra config
 */
export const getRequestConfig = (config: AxiosRequestConfig = {}) => {
	// not include authentication if standalone
	if (APP_CONFIG.IS_STANDALONE) return config;

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
