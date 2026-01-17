import { AvailableLangs } from '@/types/langs';

export const AVAILABLE_LANGS_LIST: AvailableLangs[] = [
  'en',
  'uk',
  'ru',
  'ro',
  'de',
  'fr',
  'pl',
  'es',
  'it',
  'ar',
  'ja',
  'cs',
  'zh-CN',
  'zh-TW',
].sort() as AvailableLangs[];

export const LANG_BY_CODE: Record<AvailableLangs, string> = {
  en: 'English',
  uk: 'Ukrainian',
  ro: 'Romanian',
  ru: 'Russian',
  de: 'German',
  fr: 'French',
  pl: 'Polish',
  es: 'Spanish',
  it: 'Italian',
  ar: 'Arabic',
  ja: 'Japanese',
  cs: 'Czech',
  'zh-CN': 'Chinese (Simplified)',
  'zh-TW': 'Chinese (Traditional)',
};

export const AVAILABLE_LANGS_OPTIONS = AVAILABLE_LANGS_LIST.map((lang) => ({
  value: lang,
  label: LANG_BY_CODE[lang],
})).filter(({ value }) => value !== 'zh-CN' && value !== 'zh-TW');
