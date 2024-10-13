'use client';
import Link from 'next/link';

import Logo from '@/components/Logo/Logo';
import { rootPage } from '@/config/routes';

const MainPageHeader = () => {
  return (
    <header className="flex items-center justify-between px-4 py-4">
      <div>
        <Logo />
      </div>
      <div>
        <Link
          href={rootPage.path}
          className="px-5 py-2 text-slate-600 hover:underline"
        >
          Home
        </Link>
      </div>
    </header>
  );
};

export default MainPageHeader;
