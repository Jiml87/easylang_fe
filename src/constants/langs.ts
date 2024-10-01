import { AvailableLangs } from '@/types/langs';

export const AVAILABLE_LANGS_LIST: AvailableLangs[] = [
  'en',
  'uk',
  'de',
  'fr',
  'pl',
  'es',
  'it',
  'ar',
  'ja',
].sort() as AvailableLangs[];

export const LANG_BY_CODE: Record<AvailableLangs, string> = {
  en: 'English',
  uk: 'Ukrainian',
  de: 'German',
  fr: 'French',
  pl: 'Polish',
  es: 'Spanish',
  it: 'Italian',
  ar: 'Arabic',
  ja: 'Japanese',
};

export const AVAILABLE_LANGS_OPTIONS = AVAILABLE_LANGS_LIST.map((lang) => ({
  value: lang,
  label: LANG_BY_CODE[lang],
}));
