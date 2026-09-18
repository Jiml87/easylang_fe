'use client';

import { Suspense } from 'react';
import { LoginPage } from '@/features/LoginPage/LoginPage';

const Page = () => {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
};

export default Page;
