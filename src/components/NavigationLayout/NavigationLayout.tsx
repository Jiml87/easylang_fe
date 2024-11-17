'use client';
import { ReactNode } from 'react';

import Logo from '@/components/Logo/Logo';
import { HeaderMenuProfile } from '@/components/HeaderMenuProfile/HeaderMenuProfile';

import { BottomMobileMenu } from './components/BottomMobileMenu/BottomMobileMenu';
import { HeaderMainMenu } from './components/HeaderMainMenu/HeaderMainMenu';
import './NavigationLayout.css';

interface NavigationLayoutProps {
  children: ReactNode;
}

const NavigationLayout = ({ children }: NavigationLayoutProps) => {
  return (
    <section className="mx-auto flex h-dvh max-w-4xl flex-col">
      <div className="fixed left-0 right-0 -z-10 flex justify-center">
        <div
          className="w-1/4 sm:w-1/5"
          style={{ boxShadow: '0px  0 75px 35px #94ffbf' }}
        />
      </div>
      <header className="flex justify-between p-2 align-middle">
        <Logo />
        <div className="flex items-center">
          <HeaderMainMenu />
          <HeaderMenuProfile />
        </div>
      </header>
      <div className="flex grow flex-col overflow-hidden">{children}</div>
      <BottomMobileMenu />
    </section>
  );
};

export default NavigationLayout;
