export type AvailableLangs =
  | 'en-US'
  | 'en-GB'
  | 'ro'
  | 'uk'
  | 'ru'
  | 'de'
  | 'fr-FR'
  | 'pl'
  | 'es-ES'
  | 'it'
  | 'ar'
  | 'ja'
  | 'cs'
  | 'zh-Hans'
  | 'zh-Hant';
// Supported langs: https://cloud.google.com/translate/docs/languages

export type UserTargetLang = {
  isPrimary: boolean;
  lang: AvailableLangs;
};
