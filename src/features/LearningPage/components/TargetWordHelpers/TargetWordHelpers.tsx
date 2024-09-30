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
        <li key={index} className="py-4">
          {index + 1}. {text}
        </li>
      ))}
    </ul>
  );
};

export const TargetWordAntonymSynonyms: FC<HelperComponentProps> = ({
  data,
}) => {
  const { synonyms, antonym } = data.targetWord.examples;

  return (
    <div>
      {antonym && (
        <div className="my-2">
          <h5>
            Antonym <i className="text-xs">(the opposite meaning)</i>:
          </h5>
          <div>
            {data.targetWord.examples.antonym?.text.toLocaleUpperCase()}
          </div>
        </div>
      )}
      {!!synonyms.length && (
        <div className="my-2">
          <h5>
            Synonyms <i className="text-xs">(the similar meaning):</i>
          </h5>
          <ul>
            {synonyms.map((item, index) => (
              <li key={index} className="py-2">
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
    <div className="my-2 text-center">
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
    <ul className="my-2">
      {wordList.map((item, index) => (
        <li key={index}>
          {index + 1}. {item}
        </li>
      ))}
    </ul>
  );
};
