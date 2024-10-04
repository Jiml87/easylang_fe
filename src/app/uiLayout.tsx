'use client';
import { Fragment, ReactNode } from 'react';
import { CookiesConfirmation } from '@/features/CookiesConfirmation/CookiesConfirmation';
import MessagesBar from '@/features/MessagesBar/MessagesBar';

export const UiLayout = ({ children }: { children: ReactNode }) => (
  <Fragment>
    {children}
    <CookiesConfirmation />
    <MessagesBar />
  </Fragment>
);
