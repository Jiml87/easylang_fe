import { useQuery } from 'react-query';
import axios from './axiosInstance';

export const useFetchWords = () =>
  useQuery('fetchWords', () => axios.get(`/api/v1/words`));
