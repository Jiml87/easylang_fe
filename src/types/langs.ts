export type AvailableLangs =
  | 'en'
  | 'uk'
  | 'ru'
  | 'ro'
  | 'de'
  | 'fr'
  | 'pl'
  | 'es'
  | 'it'
  | 'ar'
  | 'ja'
  | 'cs'
  | 'zh-CN'
  | 'zh-TW';
// Supported langs: https://cloud.google.com/translate/docs/languages

export type UserTargetLang = {
  isPrimary: boolean;
  lang: AvailableLangs;
};
