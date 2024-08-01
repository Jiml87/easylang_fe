'use client';
import { StrictMode } from 'react';
import Providers from '@/app/providers';

import 'primereact/resources/themes/lara-light-teal/theme.css';

interface MyAppProps {
  Component: any;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  return (
    <StrictMode>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </StrictMode>
  );
};

export default MyApp;
