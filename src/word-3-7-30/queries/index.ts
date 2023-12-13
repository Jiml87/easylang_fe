import { useQuery } from 'react-query';
import axios from 'axios';

const serverPath = process.env.NEXT_PUBLIC_API_SERVER_WORD_PATH;
const apiPath = `${serverPath}/api/v1`;

export const useFetchWords = () =>
  useQuery('fetchWords', () => axios.get(`${apiPath}/words/`));
