'use client';
import { Form, Field } from 'react-final-form';
import { Button } from 'primereact/button';

import { createPhrase, selectNewPhrase } from '@/app/add-phrase/addPhraseSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import FormInputText from '@/shared/components/FormInputText/FormInputText';
import {
  composeValidators,
  required,
  minLen,
  maxLen,
} from '@/utils/validators';

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
      render={({ handleSubmit, submitting }) => (
        <form
          onSubmit={handleSubmit}
          className="h-dvh flex flex-col justify-between p-2"
        >
          <div>
            <h1 className="my-3 text-2xl font-semibold">New phrase</h1>
            <Field
              component={FormInputText}
              name="nativePhrase"
              label="Native phrase"
              subLabel={<small>*</small>}
              inputClassName="w-full"
              disabled={isLoading || submitting}
              validate={composeValidators(required, minLen(2), maxLen(30))}
            />
            <Field
              component={FormInputText}
              name="translatedPhrase"
              label="Translation"
              subLabel={<small>*</small>}
              inputClassName="w-full"
              disabled={isLoading || submitting}
              validate={composeValidators(required, minLen(2), maxLen(30))}
            />
          </div>
          <Button label="Save" loading={isLoading} />
        </form>
      )}
    />
  );
};

export default AddWordForm;
