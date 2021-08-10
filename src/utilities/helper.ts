import { nanoid } from 'nanoid';

/**
 * Replace variables (which is placed between ${}) in a string
 * @param source input string.
 * @param replaceObj object map.
 * @example insertString("Hello ${ name }", { name: "Katorin" }) => "Hello Katorin!"
 */
export const insertString = (source: string, replaceObj: object) =>
	Object.entries(replaceObj).reduce((acc, [key, value]) => {
		const regEx = new RegExp(`\\\${\\s*${key}\\s*}`, 'g');
		return acc.replace(regEx, value);
	}, source);

/**
 * Check if str1 includes str2
 * @param str1 source string
 * @param str2 target string
 * @param caseInsensitive compare case-sensitive?
 */
export const includeStr = (
	str1: string = '',
	str2: string = '',
	caseInsensitive: boolean = false
): boolean =>
	caseInsensitive ? str1.includes(str2) : str1.toLowerCase().includes(str2.toLowerCase());

/**
 * Download file from href
 * @param href uri to data
 * @param fileName target download file name
 */
export const downloadFile = (href: string, fileName: string) => {
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

/**
 * Generate a random id with specific length
 * @param length the length of id
 * @returns the id
 */
export const generateId = (length: number | undefined = undefined) => {
	return nanoid(length);
};

interface IStringEqualOptions {
	isCaseInsensitive?: boolean;
	isExact?: boolean;
}

/**
 * Check if 2 strings are equal under options
 * @param str1 string
 * @param str2 string
 * @param param2 options for comparation
 * @returns
 */
export const isStringEqual = (
	str1: string,
	str2: string,
	{ isCaseInsensitive = false, isExact = false }: IStringEqualOptions = {}
) => {
	if (isExact) return str1 === str2;
	const transformedStr1 = (isCaseInsensitive ? str1 : str1.toLowerCase()).trim();
	const transformedStr2 = (isCaseInsensitive ? str2 : str2.toLowerCase()).trim();
	return transformedStr1 === transformedStr2;
};
