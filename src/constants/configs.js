// import { objMap } from '@utilities/helper';

export const APP_CONFIG = {
	API_ROOT: process.env.REACT_APP_API_DOMAIN,

	AUTH_DATA: 'auth_data'
};

export const API_PATH = {
	USERS: {
		ROOT: `${APP_CONFIG.API_ROOT}/users`,
		ACITON: (id) => `${APP_CONFIG.API_ROOT}/users/${id}`,
		VERIFY: `${APP_CONFIG.API_ROOT}/users/verify`
	}
};
// export const API_PATH = objMap(
// 	{
// 		USERS: {
// 			ROOT: `/users`,
// 			ACTION: (id) => `/users/${id}`,
// 			VERIFY: `/users/verify`
// 		}
// 	},
// 	(path) => `${APP_CONFIG.API_ROOT}${path}`
// );

// console.log(API_PATH);
