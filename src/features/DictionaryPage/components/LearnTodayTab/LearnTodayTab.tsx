import { FC, Fragment } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectLearningWordsForToday } from '@/features/DictionaryPage/dictionarySlice';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import WordIconStatus from '@/components/WordIconStatus/WordIconStatus';
import { learningPage } from '@/config/routes';

export const LearnTodayTab: FC = () => {
  const learningWordsForToday = useAppSelector(selectLearningWordsForToday);

  return (
    <Fragment>
      {!learningWordsForToday.length && (
        <div className="empty_list">Nothing learn today</div>
      )}
      <ul>
        {learningWordsForToday.map((word, index) => (
          <li
            key={word.id}
            className={twMerge(
              'flex cursor-pointer items-center justify-between px-2 py-2 sm:pr-10',
              index % 2 === 0 && 'bg-slate-100',
            )}
          >
            <div>
              {index + 1}.&nbsp;
              {word.targetWord.targetText}
            </div>
            <WordIconStatus
              status={word.learningDay}
              isOverdue={word.learningDate < new Date()}
            />
          </li>
        ))}
      </ul>
      {!!learningWordsForToday.length && (
        <div className="sticky bottom-0 mt-5 flex sm:justify-center">
          <Link
            href={learningPage.path}
            className="p-button w-full justify-center font-bold sm:w-auto sm:px-20"
          >
            Upload To The Brain
          </Link>
        </div>
      )}
    </Fragment>
  );
};
