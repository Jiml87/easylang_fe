'use client';

// import { NextUIProvider } from '@nextui-org/react';
// import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
// import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <QueryClientProvider client={queryClient}>
    //   <Hydrate state={pageProps.dehydratedState}>
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      {children}
    </PrimeReactProvider>
    //   </Hydrate>
    // </QueryClientProvider>
  );
}
