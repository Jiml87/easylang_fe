import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { addErrorMessage } from '@/features/MessagesBar/messagesBarSlice';

export interface ChatThreadSummary {
  id: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface StoredChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface ChatThreadDetail extends ChatThreadSummary {
  messages: StoredChatMessage[];
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    credentials: 'include',
  }),
  keepUnusedDataFor: 60,
  tagTypes: ['ChatThreads', 'ChatThread'],
  endpoints: (builder) => ({
    getChatThreads: builder.query<ChatThreadSummary[], void>({
      providesTags: ['ChatThreads'],
      query: () => '/agent/threads',
    }),
    getChatThread: builder.query<ChatThreadDetail, string>({
      providesTags: (_result, _error, threadId) => [
        { type: 'ChatThread', id: threadId },
      ],
      query: (threadId) => `/agent/threads/${threadId}`,
    }),
    deleteChatThread: builder.mutation<{ deleted: boolean }, string>({
      query: (threadId) => ({
        url: `/agent/threads/${threadId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, threadId) => [
        'ChatThreads',
        { type: 'ChatThread', id: threadId },
      ],
      async onQueryStarted(_threadId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          dispatch(addErrorMessage({ detail: 'Failed to delete chat' }));
        }
      },
    }),
  }),
});

export const {
  useGetChatThreadsQuery,
  useGetChatThreadQuery,
  useDeleteChatThreadMutation,
} = chatApi;
