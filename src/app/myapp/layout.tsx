'use server';
import { ReactNode } from 'react';

import { InitAuthInfo } from '@/features/InitAuthInfo/InitAuthInfo';
import { getAuthInfo } from '../actions';

export default async function Layout({ children }: { children: ReactNode }) {
  const authInfo = await getAuthInfo();
  return <InitAuthInfo authInfo={authInfo}>{children}</InitAuthInfo>;
}
