import { Fragment, useCallback, useState } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

import { useGetFinishedWordsQuery } from '@/api/queries/wordQueries';
import { selectCurrentTargetLanguage } from '@/features/InitProfilePage/userProfileSlice';
import { useAppSelector } from '@/store/hooks';
import { WordDetailsPopup } from '@/features/DictionaryPage/components/WordDetailsPopup/WordDetailsPopup';
import { Word } from '@/types/word';
import { WordItem } from '../WordItem/WordItem';

export const FinishedWordsTab = () => {
  const [wordDetails, setWordDetails] = useState<Word>();
  const targetLang = useAppSelector(selectCurrentTargetLanguage);
  const response = useGetFinishedWordsQuery(
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
        <div className="empty-list">There are no finished words yet</div>
      )}
      <ul>
        {data &&
          data.map((word, index) => (
            <WordItem
              key={word.id}
              data={word}
              index={index}
              onSelectWord={setWordDetails}
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
