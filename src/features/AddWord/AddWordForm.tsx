'use client';
import { Form } from 'react-final-form';
import { Button } from 'primereact/button';

import { createPhrase, selectNewPhrase } from '@/app/add-phrase/addPhraseSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import FormInput from '@/shared/components/form/FormInput/FormInput';

interface InitialValues {
  nativePhrase: string;
  translatedPhrase: string;
}

const AddWordForm = () => {
  const newPhraseState = useAppSelector(selectNewPhrase);
  const dispatch = useAppDispatch();

  const onSubmit = (values: InitialValues) => {
    dispatch(createPhrase(values));
  };

  const isLoading = newPhraseState.status === 'loading';

  return (
    <Form<InitialValues>
      onSubmit={onSubmit}
      initialValues={{
        nativePhrase: '',
        translatedPhrase: '',
      }}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="h-dvh flex flex-col justify-between p-2"
        >
          <div>
            <FormInput
              name="nativePhrase"
              label="Native phrase"
              subLabel={<small>*</small>}
              inputClassName="w-full"
              disabled={isLoading}
            />
            <FormInput
              name="translatedPhrase"
              label="Translation"
              subLabel={<small>(you can add later)</small>}
              inputClassName="w-full"
              disabled={isLoading}
            />
          </div>
          <Button label="Save" loading={isLoading} />
        </form>
      )}
    />
  );
};

export default AddWordForm;
