import { Language } from '@common/CodeEditor/CodeEditor';
import { LOCAL_STORAGE } from '../constants/configs';
import { DEFAULT_CODE } from '../constants/code-executor';

/**
 * Save code into local storage depended on language.
 * @param content the content of code
 * @param language 'javascript' | 'typescript' | 'cpp' | 'python' | 'java'
 */
export const saveCodeIntoStorage = (content: string, language: Language) => {
	const key = LOCAL_STORAGE.getKeyCodeStorage(language);
	localStorage.setItem(key, content);
};

/**
 * Get code from local storage.
 * @param language 'javascript' | 'typescript' | 'cpp' | 'python' | 'java'
 * @returns the stored code content
 */
export const getCodeFromStorage = (language: Language): string => {
	const key = LOCAL_STORAGE.getKeyCodeStorage(language);
	return localStorage.getItem(key) ?? DEFAULT_CODE[language];
};

/**
 * Save the chosen language into local storage
 * @param language language
 */
export const saveLanguageIntoStorage = (language: Language) => {
	const key = LOCAL_STORAGE.CODE_LANGUAGE;
	localStorage.setItem(key, language);
};

/**
 * Get language from local storage
 * @returns 'javascript' | 'typescript' | 'cpp' | 'python' | 'java'
 */
export const getLanguageFromStorage = (): Language => {
	const key = LOCAL_STORAGE.CODE_LANGUAGE;
	return (localStorage.getItem(key) as Language) ?? 'cpp';
};
