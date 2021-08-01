import { useAuth } from '@contexts/auth-provider';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { API_PATH } from '@constants/configs';
import { HTTP_CODE } from '@constants/global';
import { getLoginInfo, getRequestConfig, saveLoginInfo } from '../utilities/auth';

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface ApiRequestOptions {
	useTimeStamp?: boolean;
}

type ErrorResponse<T = any> = {
	data: T;
	status: number;
};

const useApi = () => {
	const { logOut } = useAuth();

	/* Get error data */
	const getErrorResponse = (error: ErrorResponse) => {
		const { data = {}, status = HTTP_CODE.BAD_REQUEST } = error;
		return Object.assign(new Error(), { ...data, status });
	};

	const needRetry = useCallback(
		async (error: ErrorResponse) => {
			/* Retry only if unauthorized error */
			if (error?.status !== HTTP_CODE.UNAUTHORIZED) return false;

			try {
				const localData = getLoginInfo();
				const result = await Axios.post(API_PATH.AUTH.REFRESH_TOKEN, {
					refreshToken: localData.refreshToken,
					userId: localData.id
				});

				saveLoginInfo({
					...localData,
					accessToken: result.data.accessToken
				});
				return true;
			} catch (e: any) {
				/* log out if refresh-token is expired */
				logOut();
			}
			return false;
		},
		[logOut]
	);

	const tryApi = useCallback(
		async <T>(
			request: (fullConfigs: AxiosRequestConfig) => Promise<AxiosResponse<T>>,
			config: {},
			retried = false
		): Promise<T> => {
			try {
				const fullConfigs: AxiosRequestConfig = getRequestConfig(config);
				const result: AxiosResponse<T> = await request(fullConfigs);

				/* Axios: The main data is in {result.data} */
				return result.data;
			} catch (error: any) {
				if (!retried) {
					const couldRetry = await needRetry(error.response as ErrorResponse);
					if (couldRetry) return tryApi(request, config, true);
				}
				return Promise.reject(getErrorResponse(error.response as ErrorResponse));
			}
		},
		[needRetry]
	);

	const apiCall = useCallback(
		<T>(
			method: HttpMethod,
			url: string,
			body: any,
			{ query = {}, config = {}, useTimeStamp = false } = {}
		): Promise<T> => {
			const axiosConfigs: AxiosRequestConfig = {
				params: { ...query, ...(useTimeStamp ? { timestamp: Date.now() } : {}) },
				...config
			};

			// Only POST, PUT, PATCH method need body data
			const needBody = ['post', 'put', 'patch'].includes(method);

			const request = (fullConfigs: AxiosRequestConfig) =>
				needBody ? Axios[method](url, body, fullConfigs) : Axios[method](url, fullConfigs);

			return tryApi<T>(request, axiosConfigs, false);
		},
		[tryApi]
	);

	const apiGet = useCallback(
		<T>(
			url: string,
			query?: any,
			{ useTimeStamp = false, ...config }: ApiRequestOptions = {}
		): Promise<T> => apiCall('get', url, null, { query, config, useTimeStamp }),
		[apiCall]
	);
	const apiPost = useCallback(
		<T>(
			url: string,
			body?: any,
			query?: any,
			{ useTimeStamp = false, ...config }: ApiRequestOptions = {}
		): Promise<T> => apiCall('post', url, body, { query, config, useTimeStamp }),
		[apiCall]
	);

	const apiPut = useCallback(
		<T>(
			url: string,
			body?: any,
			query?: any,
			{ useTimeStamp = false, ...config }: ApiRequestOptions = {}
		): Promise<T> => apiCall('put', url, body, { query, config, useTimeStamp }),
		[apiCall]
	);

	const apiPatch = useCallback(
		<T>(
			url: string,
			body?: any,
			query?: any,
			{ useTimeStamp = false, ...config }: ApiRequestOptions = {}
		): Promise<T> => apiCall('patch', url, body, { query, config, useTimeStamp }),
		[apiCall]
	);

	const apiDelete = useCallback(
		<T>(
			url: string,
			query?: any,
			{ useTimeStamp = false, ...config }: ApiRequestOptions = {}
		): Promise<T> => apiCall('delete', url, { query, config, useTimeStamp }),
		[apiCall]
	);

	/**
	 * Get interval API request
	 * @param fn function to call API
	 * @param check check function check if the result has been fulfilled
	 * @param timeout the interval, in miliseconds
	 */
	const getIntervalRequest = useCallback(
		<T>(fn: () => Promise<T>, check: (result: T) => boolean, timeout: number = 1000) => {
			const interval = setInterval(async () => {
				const result = await fn();
				if (check(result)) {
					clearInterval(interval);
				}
			}, timeout);
			return interval;
		},
		[]
	);

	return {
		apiGet,
		apiPost,
		apiPut,
		apiPatch,
		apiDelete,
		getIntervalRequest
	};
};

export default useApi;
