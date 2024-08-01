export type AvailableLangs = 'en' | 'uk' | 'de' | 'fr' | 'pl' | 'es' | 'it';

export type TargetLang = {
  isActive: boolean;
  lang: AvailableLangs;
};
