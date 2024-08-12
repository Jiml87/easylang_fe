'use client';
import React from 'react';
import Link from 'next/link';

const MainPageHeader = () => {
  return (
    <header className="flex justify-between px-4 py-4">
      <Link href="/">Logo</Link>
      <Link href="/login">Login</Link>
    </header>
  );
};

export default MainPageHeader;
