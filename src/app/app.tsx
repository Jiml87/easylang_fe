'use client';
import React from 'react';
import Providers from '@/app/providers';

interface MyAppProps {
  Component: any;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  return (
    <React.StrictMode>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </React.StrictMode>
  );
};

export default MyApp;
