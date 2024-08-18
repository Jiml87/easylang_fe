export type AvailableLangs = 'en' | 'uk' | 'de' | 'fr' | 'pl' | 'es' | 'it';

export type UserTargetLang = {
  isPrimary: boolean;
  lang: AvailableLangs;
};
