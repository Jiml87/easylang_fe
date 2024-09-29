'use client';

import dynamic from 'next/dynamic';

const DictionaryPage = dynamic(
  () => import('@/features/DictionaryPage/DictionaryPage'),
  {
    ssr: false,
  },
);

const Page = () => {
  return <DictionaryPage />;
};

export default Page;
