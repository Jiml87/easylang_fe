import { FC, useRef, SyntheticEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

import { Word, LearningStep } from '@/types/word';
import WordIconStatus from '@/components/WordIconStatus/WordIconStatus';
import { useAppDispatch } from '@/store/hooks';
import { deleteWord } from '@/features/DictionaryPage/dictionarySlice';

interface WordItemProps {
  data: Word;
  index: number;
  onSelectWord(_word: Word): void;
  learningStep: LearningStep;
}

export const WordItem: FC<WordItemProps> = ({
  data,
  index,
  onSelectWord,
  learningStep,
}) => {
  const dispatch = useAppDispatch();
  const menuRef = useRef<Menu>(null);
  const onOpenMenu = (event: SyntheticEvent) => {
    event.stopPropagation();
    menuRef?.current?.toggle(event);
  };

  const isLearnToday = learningStep === 'learnToday';
  const isLearnSoon = learningStep === 'learnSoon';
  const isFinished = learningStep === 'finished';

  const onSelectMenuItem = () => {
    dispatch(
      deleteWord({
        id: data.id,
        isFinished,
        isLearnSoon,
        isLearnToday,
      }),
    );
  };
  const menuItems = [
    {
      label: 'Delete',
      command: onSelectMenuItem,
      data,
    },
  ];

  return (
    <li
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
        {isLearnSoon && (
          <div className="ml-2 text-xs sm:text-sm">
            {data.localNextLearningDate}
          </div>
        )}
        {(isLearnToday || isLearnSoon) && (
          <WordIconStatus
            status={data.passedLearningDay}
            isOverdue={data.nextLearningDate < new Date()}
          />
        )}
        <Button
          icon="pi pi-angle-double-down"
          text
          severity="secondary"
          size="small"
          aria-label="Menu"
          onClick={onOpenMenu}
          aria-controls="popup_menu_right"
          aria-haspopup
        />
        <Menu
          model={menuItems}
          popup
          ref={menuRef}
          id="popup_menu_right"
          popupAlignment="right"
        />
      </div>
    </li>
  );
};
