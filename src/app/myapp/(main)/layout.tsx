'use client';
import { ReactNode } from 'react';
import NavigationLayout from '@/components/NavigationLayout/NavigationLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return <NavigationLayout>{children}</NavigationLayout>;
}
