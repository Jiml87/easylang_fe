import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const MyApp = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
              <Component {...pageProps} />
            </NextThemesProvider>
          </NextUIProvider>
        </Hydrate>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default MyApp;
