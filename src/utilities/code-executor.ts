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
