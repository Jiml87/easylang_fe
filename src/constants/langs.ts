import { AvailableLangs } from '@/types/langs';

export const AVAILABLE_LANGS_LIST: AvailableLangs[] = [
  'en-US',
  'en-GB',
  'en',
  'ro',
  'uk',
  'ru',
  'de',
  'fr-FR',
  'pl',
  'es-ES',
  'it',
  'ar',
  'ja',
  'cs',
  'zh-Hans',
  'zh-Hant',
].sort() as AvailableLangs[];

export const AVAILABLE_LEARNING_LANGS_LIST: AvailableLangs[] = [
  'en-US',
  'en-GB',
  'uk',
  'ro',
  'de',
  'fr-FR',
  'pl',
  'es-ES',
  'it',
  'cs',
].sort() as AvailableLangs[];

export const AVAILABLE_NATIVE_LANGS_LIST: AvailableLangs[] = [
  'en-US',
  'en-GB',
  'uk',
  'ru',
  'ro',
  'de',
  'fr-FR',
  'pl',
  'es-ES',
  'it',
  'ar',
  'ja',
  'cs',
].sort() as AvailableLangs[];

export const LANG_BY_CODE: Record<AvailableLangs, string> = {
  'en-US': 'English (US)',
  'en-GB': 'English (UK)',
  uk: 'Ukrainian',
  ro: 'Romanian',
  ru: 'Russian',
  de: 'German',
  'fr-FR': 'French',
  pl: 'Polish',
  'es-ES': 'Spanish',
  it: 'Italian',
  ar: 'Arabic',
  ja: 'Japanese',
  cs: 'Czech',
  'zh-Hans': 'Chinese (Simplified)',
  'zh-Hant': 'Chinese (Traditional)',
};

export const AVAILABLE_LEARNING_LANGS_OPTIONS =
  AVAILABLE_LEARNING_LANGS_LIST.map((lang) => ({
    value: lang,
    label: LANG_BY_CODE[lang],
  }));

export const AVAILABLE_NATIVE_LANGS_OPTIONS = AVAILABLE_NATIVE_LANGS_LIST.map(
  (lang) => ({
    value: lang,
    label: LANG_BY_CODE[lang],
  }),
);
