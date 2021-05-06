import { APP_CONFIG } from '@constants/configs';

/** --> TABLE OF CONTENTS <--
 * 	1) USER AUTHENTICATION INFOMATION
 */

/**
 * Download file from href
 * @param {string} href
 */
export const downloadFile = (href, fileName) => {
	const aTag = document.createElement('a');
	aTag.href = href;
	aTag.target = '_blank';
	aTag.download = fileName || 'download';

	document.body.appendChild(aTag);
	aTag.click();
	document.body.removeChild(aTag);
};

/**
 * Replace variables (which is placed between ${}) in a string
 * @param {string} source input string. E.g. "Hello ${name}!"
 * @param {object} replaceObj object contains value to replace. E.g. { name: "Katorin" }
 * Result from above inputs is "Hello Katorin!"
 */
export const insertString = (source, replaceObj) =>
	Object.entries(replaceObj).reduce((acc, [key, value]) => {
		const regEx = new RegExp(`\\\${\\s*${key}\\s*}`, 'g');
		return acc.replace(regEx, value);
	}, source);

/* ================================================================== */
/* USER AUTHENTICATION INFOMATION */

/**
 * Save login data into LocalStorage
 */
export const saveLoginInfo = (authData) => {
	localStorage.setItem(APP_CONFIG.AUTH_DATA, authData);
};

/**
 * Clear login auth data in Localstorage
 */
export const clearLoginInfo = () => {
	localStorage.removeItem(APP_CONFIG.AUTH_DATA);
};

/**
 * Get login data from Localstorage
 * @returns {object}
 */
export const getLoginInfo = () => JSON.parse(localStorage.getItem(APP_CONFIG.AUTH_DATA));

/**
 * Setup api config
 * @param {object} query Extra config
 */
export const getRequestConfig = (config = {}) => {
	const loginInfo = getLoginInfo();
	const { headers = {} } = config;

	return {
		...config,
		headers: {
			...(loginInfo ? { Authorization: `Bearer ${loginInfo.access_token}` } : {}),
			...headers
		}
	};
};
