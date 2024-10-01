import axios, { AxiosInstance, AxiosHeaders } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: '/api',
});

export type KnownError = {
  message: string;
  error: string;
  statusCode: number | undefined;
};

interface RequestCallback {
  headers: AxiosHeaders;
  url: string;
  method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';
  data: any;
  params: Record<string, string>;
}

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers }: RequestCallback) => {
    try {
      const result = await instance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError: any) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default instance;
