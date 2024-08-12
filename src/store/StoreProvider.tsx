'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store/store';
import { UserProfile } from '@/types/auth';
import { initProfileInfo } from '@/features/InitProfilePage/initProfileSlice';

interface ProvidersProps {
  children: React.ReactNode;
  authInfo: UserProfile | null;
}

export default function StoreProvider({ children, authInfo }: ProvidersProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // console.log('authInfo', authInfo);

    storeRef.current.dispatch(initProfileInfo(authInfo));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
