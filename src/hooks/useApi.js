import { useAuth } from '@contexts/auth-provider';
import Axios from 'axios';
import { useCallback } from 'react';
import { getLoginInfo, getRequestConfig, saveLoginInfo } from '@utilities/helper';
import { API_PATH } from '@constants/configs';
import { HTTP_CODE } from '@constants/global';

const useApi = () => {
	/* Get logOut func even when useAuth has not been initialized */
	const { logOut } = useAuth() || {};

	/* Get error data */
	const getErrorResponse = (error) => {
		const { data, status } = error.response;
		return Object.assign(new Error(), { ...data, status });
	};

	const needRetry = useCallback(
		async (error) => {
			/* Retry only if unauthorized error */
			if (error?.response?.status !== HTTP_CODE.UNAUTHORIZED) return false;

			try {
				const localData = getLoginInfo();
				const result = await Axios.post(API_PATH.AUTH.REFRESH_TOKEN, {
					refresh_token: localData.refresh_token,
					user_id: localData.user_id
				});

				saveLoginInfo({
					...localData,
					access_token: result.data.access_token
				});
				return true;
			} catch (e) {
				/* log out if refresh-token is expired */
				logOut?.();
			}
			return false;
		},
		[logOut]
	);

	const tryApi = useCallback(
		async (fn, params, config, getFullResponse, retried = false) => {
			try {
				const result = await fn(...params, getRequestConfig(config));

				/* Axios: The main data is in {result.data} */
				return getFullResponse ? result : result.data;
			} catch (error) {
				if (!retried) {
					const couldRetry = await needRetry(error);
					if (couldRetry) return tryApi(fn, params, config, getFullResponse, true);
				}
				return Promise.reject(getErrorResponse(error));
			}
		},
		[needRetry]
	);

	const apiCall = useCallback(
		(
			method,
			url,
			body,
			{ query = {}, config = {}, getFullResponse = false, useTimeStamp = false } = {}
		) => {
			const axiosConfigs = {
				params: { ...query, ...(useTimeStamp ? { timestamp: Date.now() } : {}) },
				...config
			};

			const params = method === 'get' || method === 'delete' ? [url] : [url, body];

			return tryApi(Axios[method], params, axiosConfigs, getFullResponse, false);
		},
		[tryApi]
	);

	const apiGet = useCallback(
		(url, query, { getFullResponse = false, useTimeStamp = false, ...config } = {}) =>
			apiCall('get', url, null, { query, config, getFullResponse, useTimeStamp }),
		[apiCall]
	);
	const apiPost = useCallback(
		(url, body, query, { getFullResponse = false, useTimeStamp = false, ...config } = {}) =>
			apiCall('post', url, body, { query, config, getFullResponse, useTimeStamp }),
		[apiCall]
	);

	const apiPut = useCallback(
		(url, body, query, { getFullResponse = false, useTimeStamp = false, ...config } = {}) =>
			apiCall('put', url, body, { query, config, getFullResponse, useTimeStamp }),
		[apiCall]
	);

	const apiPatch = useCallback(
		(url, body, query, { getFullResponse = false, useTimeStamp = false, ...config } = {}) =>
			apiCall('patch', url, body, { query, config, getFullResponse, useTimeStamp }),
		[apiCall]
	);

	const apiDelete = useCallback(
		(url, query, { getFullResponse = false, useTimeStamp = false, ...config } = {}) =>
			apiCall('delete', url, { query, config, getFullResponse, useTimeStamp }),
		[apiCall]
	);

	// Need refactor
	const getIntervalPromise = (fn, verifyFn, retryCount = null) =>
		new Promise((resolve, reject) => {
			let count = retryCount === null ? 1 : retryCount;
			const interval = setInterval(() => {
				fn().then(
					(response) => {
						if (retryCount !== null) {
							count -= 1;
						}

						if (verifyFn(response)) {
							clearInterval(interval);
							resolve(response);
						} else if (count < 0) {
							clearInterval(interval);
							// eslint-disable-next-line prefer-promise-reject-errors
							reject({ error: 'Timeout!' });
						}
					},
					(error) => {
						clearInterval(interval);
						reject(error);
					}
				);
			}, 5000);
		});

	return {
		apiGet,
		apiPost,
		apiPut,
		apiPatch,
		apiDelete,
		getIntervalPromise
	};
};

export default useApi;
