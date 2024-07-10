import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  // headers: {'X-Custom-Header': 'foobar'}
});

export type KnownError = {
  message: string;
  error: string;
  statusCode: number | undefined;
};

export default instance;
