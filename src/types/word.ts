import { AvailableLangs } from './langs';

export type WordLearningDay = 0 | 1 | 3 | 7 | 30;

export type TargetWordTranslations = Partial<Record<AvailableLangs, string>>;

export interface TargetWordExamples {
  description: {
    text: string;
    audioUrl: string;
  } | null;
  sentences: Array<{
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
  examples: TargetWordExamples;
  translations: TargetWordTranslations;
};

export type UserWordFromAPI = {
  id: string;
  lastPassedDate: null | string;
  learningDate: string;
  learningDay: WordLearningDay;
  targetWord: TargetWord;
};

export type Word = UserWordFromAPI & {
  lastPassedDate: null | Date;
  learningDate: Date;
};

export type LearningWordForToday = Word & {
  // sentences: Array<{ s: string }>;
};
