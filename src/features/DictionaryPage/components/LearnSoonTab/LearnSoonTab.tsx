import { useGetLearningSoonWordsQuery } from '@/api/queries/words';

export const LearnSoonTab = () => {
  const data = useGetLearningSoonWordsQuery('learningSoon');
  console.log('data', data);
  return <div>LearnSoonTab</div>;
};
