import { Fragment } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { twMerge } from 'tailwind-merge';

import { useGetFinishedWordsQuery } from '@/api/queries/wordQueries';
import WordIconStatus from '@/components/WordIconStatus/WordIconStatus';
import { selectCurrentTargetLanguage } from '@/features/InitProfilePage/userProfileSlice';
import { useAppSelector } from '@/store/hooks';

export const FinishedWordsTab = () => {
  const targetLang = useAppSelector(selectCurrentTargetLanguage);
  const response = useGetFinishedWordsQuery(
    { page: 0, targetLang },
    { skip: !Boolean(targetLang) },
  );
  const { data, isLoading } = response;
  return (
    <Fragment>
      {isLoading && (
        <div className="flex grow flex-col items-center justify-center">
          <ProgressSpinner aria-label="Loading" />
        </div>
      )}
      {!isLoading && data && !data.length && (
        <div className="empty-list">There&apos;s not finished words yet</div>
      )}
      <ul>
        {data &&
          data.map((word, index) => (
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
                status={word.passedLearningDay}
                isOverdue={word.nextLearningDate < new Date()}
              />
            </li>
          ))}
      </ul>
    </Fragment>
  );
};