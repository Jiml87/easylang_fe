import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { Word } from '@/types/word';
import WordIconStatus from '@/components/WordIconStatus/WordIconStatus';

interface WordItemProps {
  data: Word;
  index: number;
  onSelectWord(_word: Word): void;
  isLearnDate?: boolean;
  isLearningStatus?: boolean;
}

export const WordItem: FC<WordItemProps> = ({
  data,
  index,
  onSelectWord,
  isLearningStatus,
  isLearnDate,
}) => {
  return (
    <li
      key={data.id}
      className={twMerge(
        'flex cursor-pointer items-center justify-between px-2 py-2 sm:pr-10',
        index % 2 === 0 && 'bg-slate-100',
      )}
      onClick={() => onSelectWord(data)}
    >
      <div className="text-sm sm:text-base">
        {index + 1}.&nbsp;
        {data.targetWord.targetText}
      </div>
      <div className="flex items-center justify-end">
        {isLearnDate && (
          <div className="pr-2 text-xs sm:text-sm">
            {data.localNextLearningDate}
          </div>
        )}
        {isLearningStatus && (
          <WordIconStatus
            status={data.passedLearningDay}
            isOverdue={data.nextLearningDate < new Date()}
          />
        )}
      </div>
    </li>
  );
};
