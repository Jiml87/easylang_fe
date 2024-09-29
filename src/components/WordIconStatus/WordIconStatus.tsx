import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
// import { Tooltip } from 'primereact/tooltip';

import { WordLearningDay } from '@/types/word';
import './WordIconStatus.css';

interface WordIconStatusProps {
  status: WordLearningDay;
  isOverdue?: boolean;
}

const getTitleByStatus = (status: WordLearningDay): string => {
  switch (status) {
    case 0:
      return 'Not Passed Yet';
    case 1:
      return 'Passed 1st Day';
    case 3:
      return 'Passed 3st Day';
    case 7:
      return 'Passed 7st Day';
    case 30:
      return 'Finished';
    default:
      return 'Status is not available';
  }
};

const WordIconStatus: FC<WordIconStatusProps> = ({
  status,
  isOverdue = false,
}) => {
  const bgColor = isOverdue ? 'bg-red-600' : 'bg-emerald-400';
  const borderColor = isOverdue ? 'border-red-600' : 'border-emerald-400';
  return (
    <div
      className={twMerge('roundStatusIcon', borderColor)}
      title={getTitleByStatus(status)}
    >
      {status === 30 && (
        <div
          className={twMerge('roundStatusIcon_quarter left-0 top-0', bgColor)}
        />
      )}
      {(status === 7 || status === 30) && (
        <div
          className={twMerge(
            'roundStatusIcon_quarter bottom-0 left-0',
            bgColor,
          )}
        />
      )}
      {(status === 3 || status === 7 || status === 30) && (
        <div
          className={twMerge('roundStatusIcon_quarter right-0 top-0', bgColor)}
        ></div>
      )}
      {(status === 1 || status === 3 || status === 7 || status === 30) && (
        <div
          className={twMerge(
            'roundStatusIcon_quarter bottom-0 right-0',
            bgColor,
          )}
        ></div>
      )}
    </div>
  );
};

export default WordIconStatus;
