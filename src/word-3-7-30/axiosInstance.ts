import axios from 'axios';
import humps from 'humps';

const serverPath = process.env.NEXT_PUBLIC_API_SERVER_WORD_PATH;
const apiPath = `${serverPath}/api/v1`;

const instance = axios.create({
  baseURL: apiPath,
});

instance.interceptors.response.use(
  function (response) {
    return { ...response, data: humps.camelizeKeys(response.data) };
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;
