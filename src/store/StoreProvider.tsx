'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';

import { makeStore, AppStore } from '@/store/store';
import { UserProfile } from '@/types/auth';
import { userProfileInfo } from '@/features/InitProfilePage/userProfileSlice';

interface ProvidersProps {
  children: React.ReactNode;
  authInfo: UserProfile | null;
}

export default function StoreProvider({ children, authInfo }: ProvidersProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
    if (authInfo?.id) {
      storeRef.current.dispatch(userProfileInfo(authInfo));
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
