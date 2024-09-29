import dynamic from 'next/dynamic';

const InitProfilePage = dynamic(
  () => import('@/features/InitProfilePage/InitProfilePage'),
  {
    ssr: false,
  },
);

const Page = () => {
  return <InitProfilePage />;
};

export default Page;
