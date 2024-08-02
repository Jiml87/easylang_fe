'use client';
import { AVAILABLE_LANGS_LIST } from '@/constants/langs';
import { AvailableLangs } from '@/types/langs';

// TODO: Optimize for ssr and add to initialState to src/features/InitProfilePage/InitProfileForm/InitProfileForm.tsx
export const getUserLanguage = (): AvailableLangs | null => {
  const localLang =
    typeof window !== 'undefined' && window.navigator?.language
      ? navigator.language.split('-')[0]
      : null;
  return localLang && AVAILABLE_LANGS_LIST.includes(localLang as AvailableLangs)
    ? (localLang as AvailableLangs)
    : null;
};
