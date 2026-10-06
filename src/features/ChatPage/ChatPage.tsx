'use client';

import { useMemo } from 'react';
import {
  AssistantRuntimeProvider,
  AuiIf,
  ComposerPrimitive,
  ErrorPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useLocalRuntime,
  type ChatModelAdapter,
  type ThreadMessage,
} from '@assistant-ui/react';

import { wordApi } from '@/api/queries/wordQueries';
import {
  getLearningWordsForToday,
  getNumberWords,
} from '@/features/DictionaryPage/dictionarySlice';
import { useAppDispatch } from '@/store/hooks';

function messageText(message: ThreadMessage) {
  return message.content
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

function useChatModelAdapter() {
  const dispatch = useAppDispatch();

  return useMemo<ChatModelAdapter>(
    () => ({
      async run({ messages, abortSignal }) {
        const response = await fetch('/api/v1/agent/chat', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: messages
              .map((message) => ({
                role: message.role,
                content: messageText(message),
              }))
              .filter((message) => message.content.length > 0),
          }),
          signal: abortSignal,
        });

        if (!response.ok) {
          throw new Error('Chat is unavailable');
        }

        const data: { text: string; dictionaryChanged?: boolean } =
          await response.json();
        if (data.dictionaryChanged) {
          dispatch(wordApi.util.invalidateTags(['LearnSoon', 'Finished']));
          dispatch(getNumberWords());
          dispatch(getLearningWordsForToday());
        }
        return {
          content: [{ type: 'text' as const, text: data.text }],
        };
      },
    }),
    [dispatch],
  );
}

const isThreadEmpty: AuiIf.Condition = (state) => state.thread.isEmpty;
const isThreadRunning: AuiIf.Condition = (state) => state.thread.isRunning;
const isThreadIdle: AuiIf.Condition = (state) => !state.thread.isRunning;

const ChatThread = () => {
  return (
    <ThreadPrimitive.Root className="flex min-h-0 grow flex-col">
      <ThreadPrimitive.Viewport
        autoScroll
        className="flex min-h-0 grow flex-col gap-3 overflow-y-auto px-4 pt-4"
      >
        <AuiIf condition={isThreadEmpty}>
          <p className="m-auto max-w-sm text-center text-slate-500">
            Ask about a word, a phrase, or how to say something.
          </p>
        </AuiIf>
        <ThreadPrimitive.Messages>
          {({ message }) =>
            message.role === 'system' ? null : (
              <MessagePrimitive.Root
                className={
                  message.role === 'user'
                    ? 'ml-auto max-w-[85%] rounded-2xl bg-[#087f38] px-3 py-2 text-white [&_p]:m-0'
                    : 'mr-auto max-w-[85%] rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-800 [&_p]:m-0'
                }
              >
                <MessagePrimitive.Parts />
                <ErrorPrimitive.Message className="mt-1 block text-sm text-red-600" />
              </MessagePrimitive.Root>
            )
          }
        </ThreadPrimitive.Messages>
        <ThreadPrimitive.ViewportFooter className="sticky bottom-0 mt-auto bg-slate-50 px-0 pb-3 pt-2">
          <ComposerPrimitive.Root className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2">
            <ComposerPrimitive.Input
              placeholder="Message"
              rows={1}
              className="max-h-32 min-h-10 w-full grow resize-none bg-transparent px-2 py-2 text-base text-slate-800 outline-none"
            />
            <AuiIf condition={isThreadRunning}>
              <ComposerPrimitive.Cancel className="rounded-full px-4 py-2 text-sm text-slate-600">
                Stop
              </ComposerPrimitive.Cancel>
            </AuiIf>
            <AuiIf condition={isThreadIdle}>
              <ComposerPrimitive.Send className="rounded-full bg-[#087f38] px-4 py-2 text-sm text-white disabled:opacity-40">
                Send
              </ComposerPrimitive.Send>
            </AuiIf>
          </ComposerPrimitive.Root>
        </ThreadPrimitive.ViewportFooter>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
};

const ChatPage = () => {
  const chatModelAdapter = useChatModelAdapter();
  const runtime = useLocalRuntime(chatModelAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ChatThread />
    </AssistantRuntimeProvider>
  );
};

export default ChatPage;
