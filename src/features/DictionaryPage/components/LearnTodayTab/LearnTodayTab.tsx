import { Fragment, useState } from 'react';
import Link from 'next/link';
import { ProgressSpinner } from 'primereact/progressspinner';

import { useAppSelector } from '@/store/hooks';
import {
  selectLearningWordsForToday,
  selectDictionary,
} from '@/features/DictionaryPage/dictionarySlice';
import { WordDetailsPopup } from '@/features/DictionaryPage/components/WordDetailsPopup/WordDetailsPopup';
import { learningPage } from '@/config/routes';
import { Word } from '@/types/word';
import { WordItem } from '../WordItem/WordItem';

export const LearnTodayTab = () => {
  const [wordDetails, setWordDetails] = useState<Word>();
  const learningWordsForToday = useAppSelector(selectLearningWordsForToday);
  const { status } = useAppSelector(selectDictionary);
  const isLoading = status === 'pending';

  const onHideWordDetailsPopup = () => {
    setWordDetails(undefined);
  };

  // const data = learningWordsForToday.length
  //   ? new Array(50).fill(learningWordsForToday[0])
  //   : [];

  return (
    <Fragment>
      {isLoading && (
        <div className="flex grow flex-col items-center justify-center">
          <ProgressSpinner aria-label="Loading" />
        </div>
      )}
      {!learningWordsForToday.length && (
        <div className="empty-list">There&apos;s nothing to learn today</div>
      )}
      <ul>
        {learningWordsForToday.map((word, index) => (
          <WordItem
            key={word.id}
            data={word}
            index={index}
            onSelectWord={setWordDetails}
            isLearningStatus
          />
        ))}
      </ul>
      {!!learningWordsForToday.length && (
        <div className="sticky bottom-0 mt-5 flex sm:justify-center">
          <Link
            href={learningPage.path}
            className="p-button p-button-raised w-full justify-center font-bold sm:w-auto sm:px-20"
          >
            Upload To The Brain
          </Link>
        </div>
      )}
      {wordDetails && (
        <WordDetailsPopup
          visible={!!wordDetails}
          onHide={onHideWordDetailsPopup}
          data={wordDetails}
        />
      )}
    </Fragment>
  );
};
