'use client';
import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import { twMerge } from 'tailwind-merge';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* //   <Hydrate state={pageProps.dehydratedState}> */}
      <PrimeReactProvider
        value={{
          unstyled: true,
          pt: Tailwind,
          ptOptions: {
            mergeSections: true,
            mergeProps: true,
            classNameMergeFunction: twMerge,
          },
        }}
      >
        {children}
      </PrimeReactProvider>
      {/* //   </Hydrate> */}
    </QueryClientProvider>
  );
}
