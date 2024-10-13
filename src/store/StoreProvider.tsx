'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';

import { makeStore, AppStore } from '@/store/store';

interface ProvidersProps {
  children: React.ReactNode;
}

export const globalStore = makeStore();

export default function StoreProvider({ children }: ProvidersProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = globalStore;
    setupListeners(storeRef.current.dispatch);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
