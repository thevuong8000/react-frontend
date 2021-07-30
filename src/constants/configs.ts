import { extendTheme } from '@chakra-ui/react';
import { Language } from '@common/CodeEditor/CodeEditor';

export const LOCAL_STORAGE = {
	getKeyCodeStorage: (language: Language) => `code-storage-${language}`
};

export const APP_CONFIG = {
	API_ROOT: process.env.REACT_APP_API_DOMAIN,
	AUTH_DATA: `${process.env.APP_TITLE}-auth-data`
};

export const API_PATH = {
	AUTH: {
		LOGIN: `${APP_CONFIG.API_ROOT}/login`,
		REFRESH_TOKEN: `${APP_CONFIG.API_ROOT}/refresh-token`,
		TEST_TOKEN: `${APP_CONFIG.API_ROOT}/login/test-token`
	},
	USERS: {
		ROOT: `${APP_CONFIG.API_ROOT}/users`,
		CREATE: `${APP_CONFIG.API_ROOT}/users/create`,
		ACITON: (id: string) => `${APP_CONFIG.API_ROOT}/users/${id}`,
		CHANGE_PASSWORD: (id: string) => `${APP_CONFIG.API_ROOT}/users/${id}/change-password`
	},
	CODE_EXECUTOR: {
		ROOT: `${APP_CONFIG.API_ROOT}/code-executor`
	}
};

export const CHAKRA_CUSTOM_THEME = extendTheme(
	{
		initialColorMode: 'light',
		useSystemColorMode: false
	},
	{
		components: {
			Button: {
				defaultProps: {
					colorScheme: 'blue',
					size: 'xs'
				}
			},
			Checkbox: {
				defaultProps: {
					colorScheme: 'green'
				}
			},
			Radio: {
				defaultProps: {
					size: 'sm'
				}
			},
			Input: {
				defaultProps: {
					size: 'sm'
				}
			},
			Modal: {
				defaultProps: {
					autoFocus: false,
					isCentered: true,
					returnFocusOnClose: false
				}
			}
		}
	}
);
