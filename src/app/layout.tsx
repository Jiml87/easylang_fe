import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from '@/app/providers';
import MessagesBar from '@/features/MessagesBar/MessagesBar';

import '../styles/global.css';
// import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primeicons/primeicons.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mywords app',
  description: 'Mywords helps to learn new language efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
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
        <Providers>
          {children}
          <MessagesBar />
        </Providers>
      </body>
    </html>
  );
}
