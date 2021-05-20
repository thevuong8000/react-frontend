// import { objMap } from '@utilities/helper';

import { extendTheme } from '@chakra-ui/react';

export const APP_CONFIG = {
	API_ROOT: process.env.REACT_APP_API_DOMAIN,

	AUTH_DATA: 'auth_data'
};

export const API_PATH = {
	AUTH: {
		LOGIN: `${APP_CONFIG.API_ROOT}/login`,
		REFRESH_TOKEN: `${APP_CONFIG.API_ROOT}/refresh-token`
	},
	USERS: {
		ROOT: `${APP_CONFIG.API_ROOT}/users`,
		ACITON: (id) => `${APP_CONFIG.API_ROOT}/users/${id}`,
		VERIFY: `${APP_CONFIG.API_ROOT}/users/verify`
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
