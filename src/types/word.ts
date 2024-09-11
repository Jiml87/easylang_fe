import { AvailableLangs } from './langs';

export type WordLearningDay = '0' | '1' | '3' | '7' | '30';

export type WordFromAPI = {
  id: number;
  lastPassedDate: null | string;
  learningDate: string;
  learningDay: WordLearningDay;
  nativeLang: AvailableLangs;
  nativePhrase: string;
  targetLang: AvailableLangs;
  targetPhrase: string;
  sentences?: Array<{ s: string }>;
};

export type Word = WordFromAPI & {
  lastPassedDate: null | Date;
  learningDate: Date;
};

export type LearningWordForToday = Word & {
  sentences: Array<{ s: string }>;
};
