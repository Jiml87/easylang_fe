import React from 'react';
import Providers from '@/app/providers';

// import '../styles/global.css';
// import 'primereact/resources/primereact.min.css';
// import 'primereact/resources/themes/lara-light-teal/theme.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

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
