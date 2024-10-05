import { Fragment, useState, useCallback } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { twMerge } from 'tailwind-merge';

import { useGetLearningSoonWordsQuery } from '@/api/queries/wordQueries';
import WordIconStatus from '@/components/WordIconStatus/WordIconStatus';
import { selectCurrentTargetLanguage } from '@/features/InitProfilePage/userProfileSlice';
import { useAppSelector } from '@/store/hooks';
import { Word } from '@/types/word';
import './LearnSoonTab.css';
import { WordDetailsPopup } from '@/features/DictionaryPage/components/WordDetailsPopup/WordDetailsPopup';

export const LearnSoonTab = () => {
  const [wordDetails, setWordDetails] = useState<Word>();
  const targetLang = useAppSelector(selectCurrentTargetLanguage);
  const response = useGetLearningSoonWordsQuery(
    { page: 0, targetLang },
    { skip: !Boolean(targetLang) },
  );
  const { data, isLoading } = response;

  const onShowWordDetails = (word: Word) => {
    setWordDetails(word);
  };

  const onHidePopup = useCallback(() => {
    setWordDetails(undefined);
  }, [setWordDetails]);

  return (
    <Fragment>
      {isLoading && (
        <div className="flex grow flex-col items-center justify-center">
          <ProgressSpinner aria-label="Loading" />
        </div>
      )}
      {!isLoading && data && !data.length && (
        <div className="empty-list">There&apos;s nothing to learn soon</div>
      )}
      <ul className="LearnSoonTab">
        {data &&
          data.map((word, index) => (
            <li
              key={word.id}
              className={twMerge(
                'list-item',
                index % 2 === 0 && 'bg-slate-100',
              )}
              onClick={() => onShowWordDetails(word)}
            >
              <div className="gr-align-center text">
                {index + 1}.&nbsp;
                {word.targetWord.targetText}
              </div>
              <div className="gr-align-center gr-justify-end date">
                {word.localNextLearningDate}
              </div>
              <div className="gr-align-center gr-justify-end">
                <WordIconStatus
                  status={word.passedLearningDay}
                  isOverdue={word.nextLearningDate < new Date()}
                />
              </div>
            </li>
          ))}
      </ul>
      {wordDetails && (
        <WordDetailsPopup
          visible={!!wordDetails}
          onHide={onHidePopup}
          data={wordDetails}
        />
      )}
    </Fragment>
  );
};
