import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/app/providers';
import MessagesBar from '@/features/MessagesBar/MessagesBar';
import { getAuthInfo } from './actions';

import 'primereact/resources/themes/lara-light-teal/theme.css';
// import 'primereact/resources/themes/lara-dark-teal/theme.css';
import 'primeicons/primeicons.css';
import '../styles/global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mywords app',
  description: 'Mywords helps to learn new language efficiently',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const authInfo = await getAuthInfo();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-title" content="logo" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#FFFFFF" />
        <script
          // WORKAROUND for tailwind
          dangerouslySetInnerHTML={{
            __html: `
              const style = document.createElement('style')
              style.innerHTML = '@layer tailwind-base, primereact, tailwind-utilities;'
              style.setAttribute('type', 'text/css')
              document.querySelector('head').prepend(style)
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-slate-50`}>
        <Providers authInfo={authInfo}>
          {children}
          <MessagesBar />
        </Providers>
        {/* <script src="https://unpkg.com/ios-pwa-splash@1.0.0/cdn.min.js"></script>
        <script>iosPWASplash('/apple-touch-icon.png', '#FFFFFF');</script> */}
      </body>
    </html>
  );
}
