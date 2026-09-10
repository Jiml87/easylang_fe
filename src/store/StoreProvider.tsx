'use client';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';

import { makeStore } from '@/store/store';

interface ProvidersProps {
  children: React.ReactNode;
}

export const globalStore = makeStore();
setupListeners(globalStore.dispatch);

export default function StoreProvider({ children }: ProvidersProps) {
  return <Provider store={globalStore}>{children}</Provider>;
}
