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
    <div className="pointer-events-none fixed left-0 right-0 top-14 z-50 flex justify-center px-4 [&_.p-message]:pointer-events-auto">
      <Messages ref={msg} />
    </div>
  );
};

export default MessagesBar;
