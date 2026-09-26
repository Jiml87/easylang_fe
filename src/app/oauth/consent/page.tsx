'use client';

import { Suspense } from 'react';
import { McpConsentPage } from '@/features/McpConsentPage/McpConsentPage';

const Page = () => {
  return (
    <Suspense>
      <McpConsentPage />
    </Suspense>
  );
};

export default Page;
