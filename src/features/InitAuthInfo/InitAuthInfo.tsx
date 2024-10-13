'use client';
import { Fragment, FC, ReactNode, useRef } from 'react';

import { UserProfile } from '@/types/auth';
import { globalStore } from '@/store/StoreProvider';
import { userProfileInfo } from '@/features/InitProfilePage/userProfileSlice';

interface InitAuthInfoProps {
  children: ReactNode;
  authInfo: UserProfile | null;
}

export const InitAuthInfo: FC<InitAuthInfoProps> = ({ children, authInfo }) => {
  const initRef = useRef<boolean>(false);
  if (!initRef.current) {
    globalStore.dispatch(userProfileInfo(authInfo));
  }
  return <Fragment>{children}</Fragment>;
};
