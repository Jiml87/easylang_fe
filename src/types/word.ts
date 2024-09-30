import { AvailableLangs } from './langs';

export type WordLearningDay = 0 | 1 | 3 | 7 | 30;

export type TargetWordTranslations = Partial<Record<AvailableLangs, string>>;

export interface TargetWordExamples {
  description: {
    text: string;
    audioUrl: string;
  } | null;
  examples: Array<{
    translations: Partial<Record<AvailableLangs, string>>;
    text: string;
    audioUrl: string;
  }>;
  synonyms: Array<{
    text: string;
    audioUrl: string;
  }>;
  antonym: {
    text: string;
    audioUrl: string;
  } | null;
}

export type TargetWord = {
  id: string;
  targetLang: AvailableLangs;
  targetText: string;
  practice: TargetWordExamples;
  translations: TargetWordTranslations;
};

export type UserWordFromAPI = {
  id: string;
  lastLearningDate: null | string;
  nextLearningDate: string;
  passedLearningDay: WordLearningDay;
  targetWord: TargetWord;
  nativeCustomText: string;
  nativeLang: AvailableLangs;
};

export type Word = UserWordFromAPI & {
  lastLearningDate: null | Date;
  nextLearningDate: Date;
};

export type LearningWordForToday = Word & {
  descriptionWithHiddenTarget?: string;
  sentencesWithHiddenTarget?: string[];
  // examples: Array<{ s: string }>;
};
