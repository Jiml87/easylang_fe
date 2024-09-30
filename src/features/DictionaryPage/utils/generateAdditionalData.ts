import { LearningWordForToday } from '@/types/word';
import { hideTargetText } from '@/utils/hideTargetText';

export const generateAdditionalData = (
  data: LearningWordForToday[],
): LearningWordForToday[] => {
  return data.map((item) => {
    const descriptionWithHiddenTarget = hideTargetText(
      item.targetWord.examples.description?.text || '',
      item.targetWord.targetText,
    );

    const sentencesWithHiddenTarget = item.targetWord.examples.sentences.map(
      (sentence) => hideTargetText(sentence.text, item.targetWord.targetText),
    );

    return { ...item, descriptionWithHiddenTarget, sentencesWithHiddenTarget };
  });
};
