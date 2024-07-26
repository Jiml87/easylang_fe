'use client';
import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import { twMerge } from 'tailwind-merge';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

import StoreProvider from '@/store/StoreProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <StoreProvider>
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
          <GoogleOAuthProvider clientId={process.env.OAUTH_GOOGLE_ID as string}>
            {children}
          </GoogleOAuthProvider>
        </PrimeReactProvider>
        {/* //   </Hydrate> */}
      </QueryClientProvider>
    </StoreProvider>
  );
}
