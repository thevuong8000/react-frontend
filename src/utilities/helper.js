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
