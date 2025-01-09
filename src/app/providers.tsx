'use client';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import { twMerge } from 'tailwind-merge';
import { GoogleOAuthProvider } from '@react-oauth/google';

import StoreProvider from '@/store/StoreProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  console.log('OAUTH_GOOGLE_ID', process.env.OAUTH_GOOGLE_ID);

  return (
    <StoreProvider>
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
