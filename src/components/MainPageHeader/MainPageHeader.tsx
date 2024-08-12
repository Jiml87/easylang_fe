'use client';
import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';

import { selectInitProfileState } from '@/features/InitProfilePage/initProfileSlice';

const MainPageHeader = () => {
  const { userProfile } = useAppSelector(selectInitProfileState);
  return (
    <header className="flex justify-between px-4 py-4">
      <div>
        <Link href="/">Logo</Link>
      </div>
      <div>{!userProfile && <Link href="/login">Login</Link>}</div>
    </header>
  );
};

export default MainPageHeader;
