import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Word } from '@/types/word';
import type { AvailableLangs } from '@/types/langs';

export const wordApi = createApi({
  reducerPath: 'wordApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getLearningSoonWords: builder.query<
      Word[],
      { page: number; targetLang: AvailableLangs | null }
    >({
      query: ({ page, targetLang }) =>
        `/words/learning-words?targetLang=${targetLang}&page=${page}&limit=50&practice=true`,
      transformResponse: (learningWords: Word[]): Word[] => {
        console.log('learningWords', learningWords);

        return learningWords.map((word) => {
          const date = new Date(word.nextLearningDate);
          date.setDate(date.getDate() + 1);

          const formattedDate = date.toLocaleDateString(navigator.language, {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
          });
          return {
            ...word,
            nextLearningDate: date,
            localNextLearningDate: formattedDate,
          };
        });
      },
    }),
    getFinishedWords: builder.query<
      Word[],
      { page: number; targetLang: AvailableLangs | null }
    >({
      query: ({ page, targetLang }) =>
        `/words/finished-words?targetLang=${targetLang}&page=${page}&limit=50`,
    }),
  }),
});

export const { useGetLearningSoonWordsQuery, useGetFinishedWordsQuery } =
  wordApi;
