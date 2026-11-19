'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  type ThreadMessageLike,
} from '@assistant-ui/react';
import { ProgressSpinner } from 'primereact/progressspinner';

import {
  chatApi,
  useDeleteChatThreadMutation,
  useGetChatThreadQuery,
  useGetChatThreadsQuery,
} from '@/api/queries/chatQueries';
import { wordApi } from '@/api/queries/wordQueries';
import {
  getLearningWordsForToday,
  getNumberWords,
} from '@/features/DictionaryPage/dictionarySlice';
import { useAppDispatch } from '@/store/hooks';
import {
  ChatHistoryList,
  MobileChatDrawer,
} from './components/ChatHistorySidebar';
import { MarkdownText } from './components/MarkdownText';

const assistantMessageComponents = {
  Text: MarkdownText,
};

function messageText(message: ThreadMessage) {
  return message.content
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

interface ChatResponsePayload {
  threadId: string;
  title: string | null;
  text: string;
  dictionaryChanged?: boolean;
}

interface ActiveChatSessionProps {
  initialThreadId?: string;
  initialMessages?: readonly ThreadMessageLike[];
  onThreadCreated: (threadId: string, title: string | null) => void;
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
                    ? 'ml-auto max-w-[85%] whitespace-pre-wrap break-words rounded-2xl bg-[#087f38] px-3 py-2 text-white [&_p]:m-0'
                    : 'mr-auto min-w-0 max-w-[85%] overflow-hidden rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-slate-800'
                }
              >
                <MessagePrimitive.Parts
                  components={
                    message.role === 'assistant'
                      ? assistantMessageComponents
                      : undefined
                  }
                />
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

const ActiveChatSession = ({
  initialThreadId,
  initialMessages,
  onThreadCreated,
}: ActiveChatSessionProps) => {
  const dispatch = useAppDispatch();
  const threadIdRef = useRef<string | undefined>(initialThreadId);
  const titleRefreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const onThreadCreatedRef = useRef(onThreadCreated);
  onThreadCreatedRef.current = onThreadCreated;

  useEffect(() => {
    return () => {
      if (titleRefreshTimerRef.current) {
        clearTimeout(titleRefreshTimerRef.current);
      }
    };
  }, []);

  const chatModelAdapter = useMemo<ChatModelAdapter>(
    () => ({
      async run({ messages, abortSignal }) {
        const wasNewThread = !threadIdRef.current;
        const response = await fetch('/api/v1/agent/chat', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...(threadIdRef.current ? { threadId: threadIdRef.current } : {}),
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

        const data: ChatResponsePayload = await response.json();

        if (data.threadId) {
          threadIdRef.current = data.threadId;
          if (wasNewThread) {
            onThreadCreatedRef.current(data.threadId, data.title);
            titleRefreshTimerRef.current = setTimeout(() => {
              dispatch(chatApi.util.invalidateTags(['ChatThreads']));
            }, 2500);
          }
          dispatch(
            chatApi.util.invalidateTags([
              'ChatThreads',
              { type: 'ChatThread', id: data.threadId },
            ]),
          );
        }

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

  const runtime = useLocalRuntime(chatModelAdapter, {
    initialMessages,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ChatThread />
    </AssistantRuntimeProvider>
  );
};

const ChatPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [selectedHistoryThreadId, setSelectedHistoryThreadId] = useState<
    string | null
  >(null);
  const [optimisticTitle, setOptimisticTitle] = useState<string | null>(null);
  const [sessionCounter, setSessionCounter] = useState(0);
  const [deletingThreadId, setDeletingThreadId] = useState<string | null>(null);

  const { data: threads = [], isLoading: isThreadsLoading } =
    useGetChatThreadsQuery();
  const {
    data: selectedThreadDetail,
    isFetching: isSelectedThreadFetching,
    isError: isSelectedThreadError,
  } = useGetChatThreadQuery(selectedHistoryThreadId ?? '', {
    skip: !selectedHistoryThreadId,
  });
  const [deleteChatThread] = useDeleteChatThreadMutation();

  const handleNewChat = useCallback(() => {
    setDrawerOpen(false);
    setSelectedHistoryThreadId(null);
    setActiveThreadId(null);
    setOptimisticTitle(null);
    setSessionCounter((prev) => prev + 1);
  }, []);

  const handleSelectThread = useCallback(
    (threadId: string) => {
      setDrawerOpen(false);
      if (threadId === activeThreadId) {
        return;
      }
      setActiveThreadId(threadId);
      setSelectedHistoryThreadId(threadId);
      setOptimisticTitle(null);
      setSessionCounter((prev) => prev + 1);
    },
    [activeThreadId],
  );

  const handleThreadCreated = useCallback(
    (threadId: string, title: string | null) => {
      setActiveThreadId(threadId);
      setOptimisticTitle(title);
    },
    [],
  );

  const handleDeleteThread = useCallback(
    async (threadId: string) => {
      setDeletingThreadId(threadId);
      try {
        await deleteChatThread(threadId).unwrap();
        if (threadId === activeThreadId) {
          handleNewChat();
        }
      } catch {
      } finally {
        setDeletingThreadId(null);
      }
    },
    [activeThreadId, deleteChatThread, handleNewChat],
  );

  const currentTitle = useMemo(() => {
    if (!activeThreadId) {
      return 'New chat';
    }
    const matched = threads.find((thread) => thread.id === activeThreadId);
    return matched?.title || optimisticTitle || 'New chat';
  }, [activeThreadId, optimisticTitle, threads]);

  const initialMessages = useMemo<
    readonly ThreadMessageLike[] | undefined
  >(() => {
    if (
      !selectedHistoryThreadId ||
      selectedThreadDetail?.id !== selectedHistoryThreadId
    ) {
      return undefined;
    }
    return selectedThreadDetail.messages.map((msg) => ({
      id: msg.id,
      role: msg.role,
      content: [{ type: 'text' as const, text: msg.content }],
      createdAt: new Date(msg.createdAt),
    }));
  }, [selectedHistoryThreadId, selectedThreadDetail]);

  const isWaitingForHistoryMessages =
    Boolean(selectedHistoryThreadId) &&
    (isSelectedThreadFetching ||
      (!isSelectedThreadError &&
        selectedThreadDetail?.id !== selectedHistoryThreadId));

  const sessionKey = selectedHistoryThreadId
    ? `history-${selectedHistoryThreadId}-${sessionCounter}`
    : `new-${sessionCounter}`;

  return (
    <div className="flex min-h-0 grow flex-col sm:flex-row">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-2 py-1.5 sm:hidden">
        <button
          type="button"
          aria-label="Open chat history"
          onClick={() => setDrawerOpen(true)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-700 active:bg-slate-100"
        >
          <i className="pi pi-bars text-lg" />
        </button>
        <span className="min-w-0 truncate px-2 text-sm font-medium text-slate-800">
          {currentTitle}
        </span>
        <button
          type="button"
          aria-label="New chat"
          onClick={handleNewChat}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#087f38] active:bg-slate-100"
        >
          <i className="pi pi-plus text-base" />
        </button>
      </div>

      <MobileChatDrawer
        opened={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        threads={threads}
        isLoading={isThreadsLoading}
        activeThreadId={activeThreadId}
        deletingThreadId={deletingThreadId}
        onSelectThread={handleSelectThread}
        onNewChat={handleNewChat}
        onDeleteThread={handleDeleteThread}
      />

      <aside className="hidden sm:flex sm:w-60 sm:shrink-0 sm:flex-col sm:border-r sm:border-slate-200 sm:bg-white/60">
        <ChatHistoryList
          threads={threads}
          isLoading={isThreadsLoading}
          activeThreadId={activeThreadId}
          deletingThreadId={deletingThreadId}
          onSelectThread={handleSelectThread}
          onNewChat={handleNewChat}
          onDeleteThread={handleDeleteThread}
        />
      </aside>

      <div className="flex min-h-0 min-w-0 grow flex-col">
        {isWaitingForHistoryMessages ? (
          <div className="flex grow items-center justify-center">
            <ProgressSpinner
              style={{ width: '36px', height: '36px' }}
              strokeWidth="4"
            />
          </div>
        ) : isSelectedThreadError ? (
          <div className="flex grow flex-col items-center justify-center gap-3 px-4 text-center">
            <p className="text-sm text-slate-500">
              Could not load this conversation.
            </p>
            <button
              type="button"
              onClick={handleNewChat}
              className="rounded-full bg-[#087f38] px-4 py-2 text-sm text-white"
            >
              Start new chat
            </button>
          </div>
        ) : (
          <ActiveChatSession
            key={sessionKey}
            initialThreadId={selectedHistoryThreadId ?? undefined}
            initialMessages={initialMessages}
            onThreadCreated={handleThreadCreated}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
