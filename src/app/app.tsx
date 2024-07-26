'use client';
import React from 'react';
import Providers from '@/app/providers';

import 'primereact/resources/themes/lara-light-teal/theme.css';

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
