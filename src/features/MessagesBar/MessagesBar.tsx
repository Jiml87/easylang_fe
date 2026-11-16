'use client';
import { useRef, useEffect } from 'react';
import { Messages } from 'primereact/messages';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectMessages,
  clearMessages,
} from '@/features/MessagesBar/messagesBarSlice';

const MessagesBar = () => {
  const msg = useRef<Messages>(null);
  const messages = useAppSelector(selectMessages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (messages.length) {
      msg.current?.show(messages);
      setTimeout(() => {
        dispatch(clearMessages());
      }, 100);
    }
  }, [messages, dispatch]);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-14 z-50 flex justify-center px-3 sm:px-4 [&_.p-message-close-icon]:h-3 [&_.p-message-close-icon]:w-3 [&_.p-message-error_.p-message-close]:text-red-700 [&_.p-message-error_.p-message-icon]:text-red-600 [&_.p-message-error]:border-red-300 [&_.p-message-error]:border-l-red-600 [&_.p-message-error]:bg-red-100/95 [&_.p-message-error]:text-red-950 [&_.p-message-info_.p-message-close]:text-blue-700 [&_.p-message-info_.p-message-icon]:text-blue-600 [&_.p-message-info]:border-blue-300 [&_.p-message-info]:border-l-blue-600 [&_.p-message-info]:bg-blue-100/95 [&_.p-message-info]:text-blue-950 [&_.p-message-success_.p-message-close]:text-emerald-700 [&_.p-message-success_.p-message-icon]:text-emerald-700 [&_.p-message-success]:border-emerald-300 [&_.p-message-success]:border-l-emerald-600 [&_.p-message-success]:bg-emerald-100/95 [&_.p-message-success]:text-emerald-950 [&_.p-message-warn_.p-message-close]:text-amber-700 [&_.p-message-warn_.p-message-icon]:text-amber-600 [&_.p-message-warn]:border-amber-300 [&_.p-message-warn]:border-l-amber-500 [&_.p-message-warn]:bg-amber-100/95 [&_.p-message-warn]:text-amber-950 [&_.p-message]:my-1 [&_.p-message]:pointer-events-auto [&_.p-message]:rounded-xl [&_.p-message]:border [&_.p-message]:border-l-4 [&_.p-message]:shadow-lg [&_.p-message]:shadow-black/10 [&_.p-message]:backdrop-blur-xl">
      <Messages
        ref={msg}
        className="w-auto max-w-[min(24rem,calc(100vw-1.5rem))]"
        pt={{
          root: { className: 'my-0' },
          wrapper: {
            className: 'gap-2 px-3 py-2 sm:gap-2.5 sm:px-3.5 sm:py-2.5',
          },
          icon: { className: 'mr-0 h-4 w-4 shrink-0' },
          summary: {
            className: 'text-[13px] font-semibold empty:hidden sm:text-sm',
          },
          detail: {
            className: 'ml-0 text-[13px] font-medium leading-snug sm:text-sm',
          },
          button: {
            className: 'ml-1 h-6 w-6 shrink-0 hover:bg-black/5',
          },
        }}
      />
    </div>
  );
};

export default MessagesBar;
