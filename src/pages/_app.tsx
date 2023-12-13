import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

const MyApp = ({ Component, pageProps }: { Component }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
