import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Word } from '@/types/word';

// Define a service using a base URL and expected endpoints
export const wordApi = createApi({
  reducerPath: 'wordApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getLearningSoonWords: builder.query<Word, string>({
      query: () =>
        `/words/learning-words?targetLang=en&offset=0&limit=50&practice=true`,
    }),
  }),
});

export const { useGetLearningSoonWordsQuery } = wordApi;
