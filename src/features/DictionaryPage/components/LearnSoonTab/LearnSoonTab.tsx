import { Fragment, useState, useCallback } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

import { useGetLearningSoonWordsQuery } from '@/api/queries/wordQueries';
import { selectCurrentTargetLanguage } from '@/features/InitProfilePage/userProfileSlice';
import { useAppSelector } from '@/store/hooks';
import { Word } from '@/types/word';
import { WordDetailsPopup } from '@/features/DictionaryPage/components/WordDetailsPopup/WordDetailsPopup';
import { WordItem } from '../WordItem/WordItem';

export const LearnSoonTab = () => {
  const [wordDetails, setWordDetails] = useState<Word>();
  const targetLang = useAppSelector(selectCurrentTargetLanguage);
  const response = useGetLearningSoonWordsQuery(
    { page: 0, targetLang },
    { skip: !Boolean(targetLang) },
  );
  const { data, isLoading } = response;

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
            <WordItem
              key={word.id}
              data={word}
              index={index}
              onSelectWord={setWordDetails}
              learningStep="learnSoon"
            />
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
