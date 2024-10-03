'use client';
import { ReactNode, useEffect } from 'react';
import NavigationLayout from '@/components/NavigationLayout/NavigationLayout';
import {
  getLearningWordsForToday,
  getNumberWords,
} from '@/features/DictionaryPage/dictionarySlice';
import { useAppDispatch } from '@/store/hooks';

export default function Layout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getNumberWords());
    dispatch(getLearningWordsForToday());
  }, [dispatch]);

  return <NavigationLayout>{children}</NavigationLayout>;
}
