'use client';
import Link from 'next/link';

import Logo from '@/components/Logo/Logo';
import { aboutPage, rootPage } from '@/config/routes';

const MainPageHeader = () => {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <div>
        <Logo />
      </div>
      <div className="flex items-center">
        <Link
          href={rootPage.path}
          className="px-3 py-2 text-slate-600 hover:underline sm:px-5"
        >
          Home
        </Link>
        <Link
          href={aboutPage.path}
          className="px-3 py-2 text-slate-600 hover:underline sm:px-5"
        >
          How it works
        </Link>
      </div>
    </header>
  );
};

export default MainPageHeader;
