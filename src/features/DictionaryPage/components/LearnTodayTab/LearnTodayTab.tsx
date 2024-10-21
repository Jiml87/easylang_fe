import { Fragment, useState } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ProgressSpinner } from 'primereact/progressspinner';

import { useAppSelector } from '@/store/hooks';
import {
  selectLearningWordsForToday,
  selectDictionary,
} from '@/features/DictionaryPage/dictionarySlice';
import { WordDetailsPopup } from '@/features/DictionaryPage/components/WordDetailsPopup/WordDetailsPopup';
import WordIconStatus from '@/components/WordIconStatus/WordIconStatus';
import { learningPage } from '@/config/routes';
import { Word } from '@/types/word';

export const LearnTodayTab = () => {
  const [wordDetails, setWordDetails] = useState<Word>();
  const learningWordsForToday = useAppSelector(selectLearningWordsForToday);
  const { status } = useAppSelector(selectDictionary);
  const isLoading = status === 'pending';

  const onHideWordDetailsPopup = () => {
    setWordDetails(undefined);
  };

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
          <li
            key={word.id}
            className={twMerge(
              'flex cursor-pointer items-center justify-between px-2 py-2 sm:pr-10',
              index % 2 === 0 && 'bg-slate-100',
            )}
            onClick={() => setWordDetails(word)}
          >
            <div className="text-sm sm:text-base">
              {index + 1}.&nbsp;
              {word.targetWord.targetText}
            </div>
            <WordIconStatus
              status={word.passedLearningDay}
              isOverdue={word.nextLearningDate < new Date()}
            />
          </li>
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
