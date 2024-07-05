import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

interface MyAppProps {
  Component: any;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default MyApp;
