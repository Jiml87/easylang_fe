import { FC } from 'react';
import { Listbox, ListboxItem, Spinner } from '@nextui-org/react';

import { useFetchWords } from '../../queries';

const ListWords: FC = () => {
  const { isLoading, data: response } = useFetchWords();
  const data = response?.data;
  // console.log(isLoading, data, error);

  return (
    <div>
      {isLoading && <Spinner />}
      {data && (
        <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
          <ListboxItem key="new">New file</ListboxItem>
          <ListboxItem key="copy">Copy link</ListboxItem>
          <ListboxItem key="edit">Edit file</ListboxItem>
          <ListboxItem key="delete" className="text-danger" color="danger">
            Delete file
          </ListboxItem>
        </Listbox>
      )}
    </div>
  );
};

export default ListWords;
