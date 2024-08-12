'use client';
import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import { twMerge } from 'tailwind-merge';
import { GoogleOAuthProvider } from '@react-oauth/google';

import StoreProvider from '@/store/StoreProvider';
import { UserProfile } from '@/types/auth';

interface ProvidersProps {
  children: React.ReactNode;
  authInfo: UserProfile | null;
}

export default function Providers({ children, authInfo }: ProvidersProps) {
  return (
    <StoreProvider authInfo={authInfo}>
      <PrimeReactProvider
        value={{
          unstyled: false,
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
    </StoreProvider>
  );
}
