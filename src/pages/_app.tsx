import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { NextUIProvider } from '@nextui-org/react';

const MyApp = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
