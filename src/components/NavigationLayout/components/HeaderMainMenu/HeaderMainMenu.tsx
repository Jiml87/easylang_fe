import Link from 'next/link';
import { Badge } from 'primereact/badge';

import { addNewPhrasePage, dictionaryPage, rootPage } from '@/config/routes';
import { useAppSelector } from '@/store/hooks';
import { selectNumberLearningWordsForToday } from '@/features/DictionaryPage/dictionarySlice';

export const HeaderMainMenu = () => {
  const countLearningWords = useAppSelector(selectNumberLearningWordsForToday);
  return (
    <div className="hidden justify-end align-middle sm:flex">
      <Link
        href={rootPage.path}
        className="px-5 py-2 text-slate-600 hover:underline"
      >
        Home
      </Link>
      <Link
        href={addNewPhrasePage.path}
        className="px-5 py-2 text-slate-600 hover:underline"
      >
        Add word
      </Link>
      <Link
        href={dictionaryPage.path}
        className="relative px-5 py-2 text-slate-600 hover:underline"
      >
        Dictionary
        {!!countLearningWords && (
          <Badge
            value={countLearningWords}
            severity="danger"
            className="header-count-words"
          />
        )}
      </Link>
    </div>
  );
};
