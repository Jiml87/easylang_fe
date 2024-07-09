// import ListWords from '@/features/ListWords/ListWords';
import { useFetchWords } from '@/queries/words';

const ListWords = () => {
  const { data } = useFetchWords();
  console.log('data', data);

  return <div>ListWords</div>;
};

export default ListWords;
