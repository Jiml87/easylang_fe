import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from '@/app/providers';
import MessagesBar from '@/features/MessagesBar/MessagesBar';

import '../styles/global.css';
import 'primereact/resources/primereact.min.css';
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
      <body className={inter.className}>
        <Providers>
          {children}
          <MessagesBar />
        </Providers>
      </body>
    </html>
  );
}
