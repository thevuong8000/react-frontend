import { useAuth } from '@contexts/auth-provider';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { API_PATH } from '@constants/configs';
import { HTTP_CODE } from '@constants/global';
import { getLoginInfo, getRequestConfig, saveLoginInfo } from '../utilities/auth';

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface ApiRequestOptions {
  getFullResponse?: boolean;
  useTimeStamp?: boolean;
}

type ErrorResponse<T = any> = {
  data: T;
  status: number;
};

const useApi = () => {
  /* Get logOut func even when useAuth has not been initialized */
  const { logOut } = useAuth() || {};

  /* Get error data */
  const getErrorResponse = (error: AxiosError<ErrorResponse>) => {
    const { data, status } = error.response;
    return Object.assign(new Error(), { ...data, status });
  };

  const needRetry = useCallback(
    async (error: AxiosError<ErrorResponse>) => {
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
      } catch (e: any) {
        /* log out if refresh-token is expired */
        logOut?.();
      }
      return false;
    },
    [logOut]
  );

  const tryApi = useCallback(
    async <T>(
      request: (fullConfigs: AxiosRequestConfig) => Promise<AxiosResponse<T>>,
      config: {},
      getFullResponse: boolean,
      retried = false
    ): Promise<T | AxiosResponse<T>> => {
      try {
        const fullConfigs: AxiosRequestConfig = getRequestConfig(config);
        const result: AxiosResponse<T> = await request(fullConfigs);

        /* Axios: The main data is in {result.data} */
        return getFullResponse ? result : result.data;
      } catch (error: any) {
        if (!retried) {
          const couldRetry = await needRetry(error);
          if (couldRetry) return tryApi(request, config, getFullResponse, true);
        }
        return Promise.reject(getErrorResponse(error));
      }
    },
    [needRetry]
  );

  const apiCall = useCallback(
    <T>(
      method: HttpMethod,
      url: string,
      body: any,
      { query = {}, config = {}, getFullResponse = false, useTimeStamp = false } = {}
    ): Promise<T | AxiosResponse<T>> => {
      const axiosConfigs: AxiosRequestConfig = {
        params: { ...query, ...(useTimeStamp ? { timestamp: Date.now() } : {}) },
        ...config
      };

      const needBody = ['post', 'put', 'patch'].includes(method);

      const request = (fullConfigs: AxiosRequestConfig) =>
        needBody ? Axios[method](url, body, fullConfigs) : Axios[method](url, fullConfigs);

      return tryApi<T>(request, axiosConfigs, getFullResponse, false);
    },
    [tryApi]
  );

  const apiGet = useCallback(
    <T>(
      url: string,
      query?: any,
      { getFullResponse = false, useTimeStamp = false, ...config }: ApiRequestOptions = {}
    ): Promise<T | AxiosResponse<T>> =>
      apiCall('get', url, null, { query, config, getFullResponse, useTimeStamp }),
    [apiCall]
  );
  const apiPost = useCallback(
    <T>(
      url: string,
      body?: any,
      query?: any,
      { getFullResponse = false, useTimeStamp = false, ...config }: ApiRequestOptions = {}
    ): Promise<T | AxiosResponse<T>> =>
      apiCall('post', url, body, { query, config, getFullResponse, useTimeStamp }),
    [apiCall]
  );

  const apiPut = useCallback(
    <T>(
      url: string,
      body?: any,
      query?: any,
      { getFullResponse = false, useTimeStamp = false, ...config }: ApiRequestOptions = {}
    ): Promise<T | AxiosResponse<T>> =>
      apiCall('put', url, body, { query, config, getFullResponse, useTimeStamp }),
    [apiCall]
  );

  const apiPatch = useCallback(
    <T>(
      url: string,
      body?: any,
      query?: any,
      { getFullResponse = false, useTimeStamp = false, ...config }: ApiRequestOptions = {}
    ): Promise<T | AxiosResponse<T>> =>
      apiCall('patch', url, body, { query, config, getFullResponse, useTimeStamp }),
    [apiCall]
  );

  const apiDelete = useCallback(
    <T>(
      url: string,
      query?: any,
      { getFullResponse = false, useTimeStamp = false, ...config }: ApiRequestOptions = {}
    ): Promise<T | AxiosResponse<T>> =>
      apiCall('delete', url, { query, config, getFullResponse, useTimeStamp }),
    [apiCall]
  );

  // Need refactor
  // const getIntervalPromise = (fn, verifyFn, retryCount = null) =>
  //   new Promise((resolve, reject) => {
  //     let count = retryCount === null ? 1 : retryCount;
  //     const interval = setInterval(() => {
  //       fn().then(
  //         (response) => {
  //           if (retryCount !== null) {
  //             count -= 1;
  //           }

  //           if (verifyFn(response)) {
  //             clearInterval(interval);
  //             resolve(response);
  //           } else if (count < 0) {
  //             clearInterval(interval);
  //             // eslint-disable-next-line prefer-promise-reject-errors
  //             reject({ error: 'Timeout!' });
  //           }
  //         },
  //         (error) => {
  //           clearInterval(interval);
  //           reject(error);
  //         }
  //       );
  //     }, 5000);
  //   });

  return {
    apiGet,
    apiPost,
    apiPut,
    apiPatch,
    apiDelete
    // getIntervalPromise
  };
};

export default useApi;
