'use client';
import dynamic from 'next/dynamic';

const LearningPage = dynamic(
  () => import('@/features/LearningPage/LearningPage'),
  {
    ssr: false,
  },
);

const Page = () => {
  return <LearningPage />;
};

export default Page;
