'use client';
import { Fragment } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const DictionaryPage = dynamic(
  () => import('@/features/DictionaryPage/DictionaryPage'),
  {
    ssr: false,
  },
);

const Page = () => {
  return (
    <Fragment>
      <Head>
        <title>Dictionary</title>
      </Head>
      <DictionaryPage />
    </Fragment>
  );
};

export default Page;
