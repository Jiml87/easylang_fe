'use client';
import { Fragment } from 'react';
import Head from 'next/head';
import ConnectAiPage from '@/features/ConnectAiPage/ConnectAiPage';

const Page = () => {
  return (
    <Fragment>
      <Head>
        <title>Connect AI</title>
      </Head>
      <ConnectAiPage />
    </Fragment>
  );
};

export default Page;
