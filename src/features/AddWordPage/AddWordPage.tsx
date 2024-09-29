'use client';
import { useState } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
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
import AutoTranslation from './components/AutoTranslation/AutoTranslation';
import { selectUserLangs } from '@/features/InitProfilePage/userProfileSlice';
import { LANG_BY_CODE } from '@/constants/langs';

interface InitialValues {
  nativeText: string; // provided by translator
  nativeCustomText: string;
  targetText: string;
}

const AddWordForm = () => {
  const dispatch = useAppDispatch();
  const newPhraseState = useAppSelector(selectNewPhrase);
  const { targetLang, nativeLang } = useAppSelector(selectUserLangs);
  const [translationLoading, setTranslationLoading] = useState<boolean>();

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
      subscription={{ submitting: true, pristine: true }}
      onSubmit={onSubmit}
      initialValues={{
        targetText: '',
        nativeText: '',
        nativeCustomText: '',
      }}
      render={({ handleSubmit, submitting, form }) => (
        <form
          onSubmit={handleSubmit}
          className="flex h-full grow flex-col justify-between p-2 sm:grow-0 sm:justify-center"
        >
          <div>
            <h1 className="my-3 text-2xl font-semibold">Add word or phrase</h1>
            <Field
              component={FormTextArea}
              name="targetText"
              label={LANG_BY_CODE[targetLang!]}
              subLabel={<small>*</small>}
              inputClassName="w-full"
              disabled={isLoading || submitting}
              validate={composeValidators(required, minLen(2), maxLen(30))}
            />
            <Field
              component={FormTextArea}
              name="nativeCustomText"
              label={LANG_BY_CODE[nativeLang!]}
              subLabel={<small>*</small>}
              inputClassName="w-full"
              disabled={isLoading || submitting}
              validate={composeValidators(required, minLen(2), maxLen(30))}
              loading={translationLoading}
            />
            <FormSpy
              subscription={{
                values: true,
              }}
              onChange={({ values }) => {
                if (!values.targetText) {
                  form.change('nativeCustomText', '');
                }
              }}
            />
            <FormSpy
              subscription={{
                values: true,
              }}
            >
              {(props: { values: InitialValues }) => (
                <AutoTranslation
                  targetText={props.values.targetText}
                  setLoading={setTranslationLoading}
                />
              )}
            </FormSpy>
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
