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
    <div className="fixed left-0 right-0 top-0 flex justify-center px-4">
      <Messages ref={msg} />
    </div>
  );
};

export default MessagesBar;
