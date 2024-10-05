'use client';
import { Fragment } from 'react';
import Head from 'next/head';
import AddWordPage from '@/features/AddWordPage/AddWordPage';

const Page = () => {
  return (
    <Fragment>
      <Head>
        <title>Add word or phrase</title>
      </Head>
      <AddWordPage />
    </Fragment>
  );
};

export default Page;
