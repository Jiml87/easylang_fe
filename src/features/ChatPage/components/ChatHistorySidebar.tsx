'use client';

import type { MouseEvent } from 'react';
import { useSwipeable } from 'react-swipeable';
import { twMerge } from 'tailwind-merge';

import type { ChatThreadSummary } from '@/api/queries/chatQueries';

interface ChatHistoryListProps {
  threads: ChatThreadSummary[];
  isLoading: boolean;
  activeThreadId: string | null;
  deletingThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  onNewChat: () => void;
  onDeleteThread: (threadId: string) => void;
}

export const ChatHistoryList = ({
  threads,
  isLoading,
  activeThreadId,
  deletingThreadId,
  onSelectThread,
  onNewChat,
  onDeleteThread,
}: ChatHistoryListProps) => {
  const handleDeleteClick = (
    event: MouseEvent<HTMLButtonElement>,
    threadId: string,
  ) => {
    event.stopPropagation();
    onDeleteThread(threadId);
  };

  return (
    <div className="flex min-h-0 grow flex-col">
      <div className="p-3">
        <button
          type="button"
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#087f38]/30 bg-[#087f38]/10 px-3 py-2 text-sm font-medium text-[#087f38] transition-colors hover:bg-[#087f38]/15"
        >
          <i className="pi pi-plus text-xs" />
          <span>New chat</span>
        </button>
      </div>

      <div className="flex min-h-0 grow flex-col gap-1 overflow-y-auto px-2 pb-3">
        {isLoading && threads.length === 0 ? (
          <p className="px-2 py-4 text-center text-xs text-slate-400">
            Loading history...
          </p>
        ) : threads.length === 0 ? (
          <p className="px-2 py-4 text-center text-xs text-slate-400">
            No conversations yet
          </p>
        ) : (
          threads.map((thread) => {
            const isActive = thread.id === activeThreadId;
            const isDeleting = thread.id === deletingThreadId;

            return (
              <div
                key={thread.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectThread(thread.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelectThread(thread.id);
                  }
                }}
                className={twMerge(
                  'group flex cursor-pointer items-center justify-between gap-1 rounded-xl px-3 py-2 text-left text-sm transition-colors',
                  isActive
                    ? 'bg-[#087f38]/12 font-medium text-[#087f38]'
                    : 'text-slate-700 hover:bg-slate-100',
                  isDeleting && 'pointer-events-none opacity-50',
                )}
              >
                <span className="min-w-0 grow truncate">
                  {thread.title || 'Untitled chat'}
                </span>
                <button
                  type="button"
                  aria-label="Delete chat"
                  onClick={(event) => handleDeleteClick(event, thread.id)}
                  className={twMerge(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-opacity hover:bg-slate-200/70 hover:text-red-600',
                    !isActive && 'sm:opacity-0 sm:group-hover:opacity-100',
                  )}
                >
                  <i className="pi pi-trash text-xs" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

interface MobileChatDrawerProps extends ChatHistoryListProps {
  opened: boolean;
  onClose: () => void;
}

export const MobileChatDrawer = ({
  opened,
  onClose,
  ...listProps
}: MobileChatDrawerProps) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => onClose(),
  });

  return (
    <div
      inert={!opened}
      className={twMerge(
        'fixed inset-0 z-40 sm:hidden',
        !opened && 'pointer-events-none',
      )}
      aria-hidden={!opened}
    >
      <div
        onClick={onClose}
        className={twMerge(
          'absolute inset-0 bg-black/40 transition-opacity duration-200',
          opened ? 'opacity-100' : 'opacity-0',
        )}
      />
      <aside
        {...swipeHandlers}
        className={twMerge(
          'relative z-10 flex h-full w-72 max-w-[82vw] flex-col bg-white shadow-xl transition-transform duration-200',
          opened ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2.5">
          <span className="text-sm font-semibold text-slate-800">
            Chat history
          </span>
          <button
            type="button"
            aria-label="Close chat history"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 active:bg-slate-100"
          >
            <i className="pi pi-times text-sm" />
          </button>
        </div>
        <ChatHistoryList {...listProps} />
      </aside>
    </div>
  );
};
