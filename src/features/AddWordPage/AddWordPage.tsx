'use client';
import { useState, useCallback } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import { Button } from 'primereact/button';
import { twMerge } from 'tailwind-merge';

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
import { ShadowSpinner } from '@/components/ShadowSpinner/ShadowSpinner';

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

  const TranslationComponent = useCallback(
    (props: { values: InitialValues }) => (
      <AutoTranslation
        targetText={props.values.targetText}
        setLoading={setTranslationLoading}
      />
    ),
    [setTranslationLoading],
  );

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
          className="flex h-full grow flex-col justify-between p-5 sm:grow-0 sm:justify-center"
        >
          <div>
            <h1>Add a word or phrase </h1>
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
              component={TranslationComponent}
            >
              {/* {TranslationComponent} */}
            </FormSpy>
          </div>
          <ShadowSpinner isLoading={isLoading} className="w-full sm:w-auto">
            <Button
              label="Save"
              disabled={isLoading}
              className={twMerge(
                'w-full pb-6 sm:w-auto sm:self-center sm:px-14',
                isLoading && 'pointer-events-none',
              )}
            />
          </ShadowSpinner>
        </form>
      )}
    />
  );
};

export default AddWordForm;
