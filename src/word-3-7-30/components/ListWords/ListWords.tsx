import { FC } from 'react';
import { useFetchWords } from '../../queries';

const ListWords: FC = () => {
  const { isLoading, data, error } = useFetchWords();
  console.log(data);

  return <div>ListWords</div>;
};

export default ListWords;
