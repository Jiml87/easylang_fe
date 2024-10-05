import { FC, useMemo } from 'react';

import { LearningWordForToday } from '@/types/word';
import { useAppSelector } from '@/store/hooks';
import { selectLearningWordsForToday } from '@/features/DictionaryPage/dictionarySlice';
import { shuffleArray } from '@/utils/shuffleArray';

interface HelperComponentProps {
  data: LearningWordForToday;
}

export const TargetWordSentences: FC<HelperComponentProps> = ({ data }) => {
  return (
    <ul>
      {data.sentencesWithHiddenTarget?.map((text, index) => (
        <li key={index} className="mb-2 py-1">
          {index + 1}. {text}
        </li>
      ))}
    </ul>
  );
};

export const TargetWordAntonymSynonyms: FC<HelperComponentProps> = ({
  data,
}) => {
  const { synonyms, antonym } = data.targetWord.practice;

  return (
    <div>
      {antonym && (
        <div>
          <h3 className="mt-0">
            Antonym <i className="text-xs">(the opposite meaning)</i>:
          </h3>
          <div className="text-sm">
            {data.targetWord.practice.antonym?.text.toLocaleUpperCase()}
          </div>
        </div>
      )}
      {!!synonyms.length && (
        <div>
          <h3>
            Synonyms <i className="text-xs">(the similar meaning)</i>:
          </h3>
          <ul>
            {synonyms.map((item, index) => (
              <li key={index} className="pb-2 text-sm">
                {index + 1}. {item.text.toLocaleUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const TargetWordTranslation: FC<HelperComponentProps> = ({ data }) => {
  return (
    <div className="text-center">
      {data.nativeCustomText.toLocaleUpperCase()}
    </div>
  );
};

export const WordListToLearnToday: FC<HelperComponentProps> = () => {
  const learningWordsForToday = useAppSelector(selectLearningWordsForToday);
  const wordList = useMemo(() => {
    return shuffleArray<string>(
      learningWordsForToday.map(({ targetWord }) => targetWord.targetText),
    );
  }, [learningWordsForToday]);
  return (
    <ul>
      {wordList.map((item, index) => (
        <li key={index}>
          {index + 1}. {item}
        </li>
      ))}
    </ul>
  );
};
