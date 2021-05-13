import { APP_CONFIG } from '@constants/configs';

/** --> TABLE OF CONTENTS <--
 * 	1) USER AUTHENTICATION INFOMATION
 * 	2) STRING PROCESS
 * 	3) API CONFIG
 * 	4) OTHERS
 *
 */

/* ============================= USER AUTHENTICATION INFOMATION ============================= */
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

/* ============================= STRING PROCESSING ============================= */

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

/**
 * Check if str1 includes str2 insensitively
 * @param {string} str1 source string
 * @param {string} str2 target string
 * @returns {boolean}
 */
export const includeStr = (str1 = '', str2 = '') =>
	`${str1}`.toLowerCase().includes(`${str2}`.toLowerCase());

/**
 * Join strings by a separator
 * @param {array} arrStrings
 * @param {string} separator
 * @returns {string}
 */
export const joinStrings = (arrStrings = [], separator = ', ') => arrStrings.join(separator);

/* ============================= API CONFIG ============================= */

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

/* ============================= OTHERS ============================= */

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
 * Check if input is empty: empty-string | empty-array | empty-object
 * @param {*} input
 * @returns {boolean}
 */
export const isEmpty = (input) =>
	input === '' ||
	input === null ||
	input === undefined ||
	(typeof input === 'object' && Object.keys(input).length <= 0);

/**
 * Map for object
 * For example:
 * obj = { a: {name: 'abc'}, b: 'def' }
 * func = (str) => 'x' + str
 * => return { a: {name: 'xabc'}, b: 'xdef' }
 * @param {object} obj
 * @param {function} func
 * @returns {object}
 */
export const objMap = (obj, func) =>
	Object.fromEntries(
		Object.entries(obj).map(([key, value]) =>
			typeof value === 'object'
				? [key, objMap(value, func)]
				: [key, typeof value === 'function' ? (...params) => func(value(...params)) : func(value)]
		)
	);
