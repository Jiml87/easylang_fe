import { useAppSelector } from '@/store/hooks';
import { selectLearningWordsForToday } from '@/features/DictionaryPage/dictionarySlice';
import Link from 'next/link';

const words = new Array(50).fill('hello');

export const LearnTodayTab = () => {
  const learningWordsForToday = useAppSelector(selectLearningWordsForToday);
  console.log('learningWordsForToday', learningWordsForToday);

  return (
    <div>
      {!learningWordsForToday.length && (
        <div className="empty_list">Nothing learn today</div>
      )}
      {words.map((word) => (
        <div key={word}>{word}</div>
      ))}
      {/* {learningWordsForToday.map((word) => (
        <div key={word.id}>{word.targetPhrase}</div>
      ))} */}
      {!!learningWordsForToday.length && (
        <div className="pt-5">
          <Link
            href="/"
            className="p-button w-full justify-center font-bold sm:w-auto"
          >
            Upload To The Brain
          </Link>
        </div>
      )}
    </div>
  );
};
