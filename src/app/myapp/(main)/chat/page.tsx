'use client';
import { Fragment } from 'react';
import Head from 'next/head';

import ChatPage from '@/features/ChatPage/ChatPage';

const Page = () => {
  return (
    <Fragment>
      <Head>
        <title>AI Assistant</title>
      </Head>
      <ChatPage />
    </Fragment>
  );
};

export default Page;
