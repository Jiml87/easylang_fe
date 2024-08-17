'use client';
import React from 'react';
import { Form, Field } from 'react-final-form';
import { Button } from 'primereact/button';

import {
  createPhrase,
  selectNewPhrase,
} from '@/features/AddWordPage/addWordSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import FormTextArea from '@/components/FormTextArea/FormTextArea';
import {
  composeValidators,
  required,
  minLen,
  maxLen,
} from '@/utils/validators';

interface InitialValues {
  nativePhrase: string;
  targetPhrase: string;
}

const AddWordForm = () => {
  const dispatch = useAppDispatch();
  const newPhraseState = useAppSelector(selectNewPhrase);

  const onSubmit = (values: InitialValues, form: any) => {
    dispatch(createPhrase(values)).then((res: any) => {
      if (!res.error) {
        form.reset();
      }
    });
  };

  const isLoading = newPhraseState.status === 'loading';

  return (
    <Form<InitialValues>
      onSubmit={onSubmit}
      initialValues={{
        nativePhrase: '',
        targetPhrase: '',
      }}
      render={({ handleSubmit, submitting }) => (
        <form
          onSubmit={handleSubmit}
          className="flex grow flex-col justify-between p-2 sm:grow-0 sm:justify-center"
        >
          <div>
            <h1 className="my-3 text-2xl font-semibold">Add word or phrase</h1>
            <Field
              component={FormTextArea}
              name="targetPhrase"
              label="Target word"
              subLabel={<small>*</small>}
              inputClassName="w-full"
              disabled={isLoading || submitting}
              validate={composeValidators(required, minLen(2), maxLen(30))}
            />
            <Field
              component={FormTextArea}
              name="nativePhrase"
              label="Native word"
              subLabel={<small>*</small>}
              inputClassName="w-full"
              disabled={isLoading || submitting}
              validate={composeValidators(required, minLen(2), maxLen(30))}
            />
          </div>
          <Button
            label="Save"
            loading={isLoading}
            className="pb-6 sm:self-center sm:px-14"
          />
        </form>
      )}
    />
  );
};

export default AddWordForm;
