import { APP_CONFIG } from '@constants/configs';

/** --> TABLE OF CONTENTS <--
 * 	1) USER AUTHENTICATION INFOMATION
 * 	2) STRING PROCESS
 * 	3) API CONFIG
 * 	4) VERIFICATION
 * 	5) OTHERS
 *
 */

/* ============================= USER AUTHENTICATION INFOMATION ============================= */
/* USER AUTHENTICATION INFOMATION */

/**
 * Save login data into LocalStorage
 */
export const saveLoginInfo = (authData) => {
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
 * @returns {object}
 */
export const getLoginInfo = () => JSON.parse(localStorage.getItem(APP_CONFIG.AUTH_DATA)) ?? {};

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
  const { access_token } = getLoginInfo();
  const { headers = {} } = config;

  return {
    ...config,
    headers: {
      ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      ...headers
    }
  };
};

/* ============================= VERIFICATION ============================= */

/**
 * Validate password as followed rules:
 * 1) Minimum 8 characters
 * 2) Maximum 50 characters
 * 2) One uppercase letter
 * 3) One lowercase letter
 * 4) One number
 * 5) One special character
 * @param {string} password
 * @returns {boolean}
 */
export const isValidPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/.test(password);

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
export const isEmpty = (input: any): boolean =>
  input === '' ||
  input === null ||
  input === undefined ||
  (typeof input === 'object' && Object.keys(input).length <= 0);

export const evalFV: <T, P>(fn: FunctionValue<T, P>, props: P) => T = (fn, props) => {
  return fn instanceof Function ? fn(props) : fn;
};