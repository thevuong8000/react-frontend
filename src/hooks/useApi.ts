import { useAuth } from '@contexts/auth-provider';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
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
      retried = false
    ): Promise<T> => {
      try {
        const fullConfigs: AxiosRequestConfig = getRequestConfig(config);
        const result: AxiosResponse<T> = await request(fullConfigs);

        /* Axios: The main data is in {result.data} */
        return result.data;
      } catch (error: any) {
        if (!retried) {
          const couldRetry = await needRetry(error);
          if (couldRetry) return tryApi(request, config, true);
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

  return {
    apiGet,
    apiPost,
    apiPut,
    apiPatch,
    apiDelete
  };
};

export default useApi;
