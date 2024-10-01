export type AvailableLangs =
  | 'en'
  | 'uk'
  | 'de'
  | 'fr'
  | 'pl'
  | 'es'
  | 'it'
  | 'ar'
  | 'ja';
// Supported langs: https://cloud.google.com/translate/docs/languages

export type UserTargetLang = {
  isPrimary: boolean;
  lang: AvailableLangs;
};
