'use client';
import { Fragment } from 'react';
import Head from 'next/head';

import ChatPage from '@/features/ChatPage/ChatPage';

const Page = () => {
  return (
    <Fragment>
      <Head>
        <title>Chat</title>
      </Head>
      <ChatPage />
    </Fragment>
  );
};

export default Page;
