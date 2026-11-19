import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  addErrorMessage,
  addSuccessMessage,
} from '@/features/MessagesBar/messagesBarSlice';

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

export interface AgentSettings {
  instructions: string | null;
  memoryEnabled: boolean;
}

export interface UpdateAgentSettingsPayload {
  instructions?: string;
  memoryEnabled?: boolean;
}

export interface AgentMemory {
  id: string;
  content: string;
  category: 'profile' | 'goal' | 'interest' | 'preference' | 'difficulty';
  createdAt: string;
  updatedAt: string;
}

export const AGENT_INSTRUCTIONS_MAX_LENGTH = 2000;

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    credentials: 'include',
  }),
  keepUnusedDataFor: 60,
  tagTypes: ['ChatThreads', 'ChatThread', 'AgentSettings', 'AgentMemories'],
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
    getAgentSettings: builder.query<AgentSettings, void>({
      providesTags: ['AgentSettings'],
      query: () => '/agent/settings',
    }),
    updateAgentSettings: builder.mutation<
      AgentSettings,
      UpdateAgentSettingsPayload
    >({
      query: (body) => ({
        url: '/agent/settings',
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            chatApi.util.upsertQueryData('getAgentSettings', undefined, data),
          );
          if (payload.instructions !== undefined) {
            dispatch(addSuccessMessage({ detail: 'Instructions saved' }));
          }
        } catch {
          dispatch(addErrorMessage({ detail: 'Failed to save settings' }));
        }
      },
    }),
    getAgentMemories: builder.query<AgentMemory[], void>({
      providesTags: ['AgentMemories'],
      query: () => '/agent/memories',
    }),
    deleteAgentMemory: builder.mutation<{ deleted: boolean }, string>({
      query: (memoryId) => ({
        url: `/agent/memories/${memoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AgentMemories'],
      async onQueryStarted(_memoryId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          dispatch(addErrorMessage({ detail: 'Failed to delete memory' }));
        }
      },
    }),
    clearAgentMemories: builder.mutation<{ deleted: number }, void>({
      query: () => ({
        url: '/agent/memories',
        method: 'DELETE',
      }),
      invalidatesTags: ['AgentMemories'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(addSuccessMessage({ detail: 'Memory cleared' }));
        } catch {
          dispatch(addErrorMessage({ detail: 'Failed to clear memory' }));
        }
      },
    }),
  }),
});

export const {
  useGetChatThreadsQuery,
  useGetChatThreadQuery,
  useDeleteChatThreadMutation,
  useGetAgentSettingsQuery,
  useUpdateAgentSettingsMutation,
  useGetAgentMemoriesQuery,
  useDeleteAgentMemoryMutation,
  useClearAgentMemoriesMutation,
} = chatApi;
