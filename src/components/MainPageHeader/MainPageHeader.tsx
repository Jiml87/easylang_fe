'use client';
import Link from 'next/link';

import { useAppSelector } from '@/store/hooks';
import { selectUserProfile } from '@/features/InitProfilePage/userProfileSlice';
import Logo from '@/components/Logo/Logo';
import { loginPage } from '@/config/routes';

const MainPageHeader = () => {
  const userProfile = useAppSelector(selectUserProfile);
  return (
    <header className="flex justify-between px-4 py-4">
      <div>
        <Logo />
      </div>
      <div>{!userProfile && <Link href={loginPage.path}>Login</Link>}</div>
    </header>
  );
};

export default MainPageHeader;
