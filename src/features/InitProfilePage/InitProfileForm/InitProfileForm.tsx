'use client';
import { Form, Field } from 'react-final-form';
import { Button } from 'primereact/button';

import FormGroupRadioButtons from '@/components/FormGroupRadioButtons/FormGroupRadioButtons';
import FormInputText from '@/components/FormInputText/FormInputText';
import { useAppDispatch } from '@/store/hooks'; //useAppSelector
import { useRouter } from 'next/navigation';
import {
  composeValidators,
  required,
  minLen,
  maxLen,
} from '@/utils/validators';
import { AvailableLangs } from '@/types/langs';
import { AVAILABLE_LANGS_OPTIONS } from '@/constants/langs';
import { initProfileRequest } from '@/app/myapp/init-profile/initProfileSlice';

interface InitialValues {
  firstName: string;
  targetLang: AvailableLangs | null;
  nativeLang: AvailableLangs | null;
}

const InitProfileForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    dispatch(initProfileRequest(data)).then((response) => {
      response.payload.id && router.push('/add-phrase');
    });
  };
  const isLoading = false;

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl">
        <h1 className="flex-wrap">
          <span>Welcome!</span>
          <span>Let&apos;s set up your profile.</span>
        </h1>
        <Form<InitialValues>
          onSubmit={onSubmit}
          initialValues={{
            firstName: '',
            nativeLang: 'en',
            targetLang: null,
          }}
          render={({ handleSubmit, submitting, values, form }) => (
            <form onSubmit={handleSubmit} className="p-2">
              <div>
                <Field
                  component={FormInputText}
                  name="firstName"
                  label="Your name"
                  inputClassName="w-full"
                  disabled={isLoading || submitting}
                  validate={composeValidators(required, minLen(2), maxLen(30))}
                />
                <FormGroupRadioButtons
                  name="nativeLang"
                  label="What's your native language?"
                  disabled={isLoading || submitting}
                  validate={composeValidators(required)}
                  options={AVAILABLE_LANGS_OPTIONS}
                  customOnChange={(newVal: string) =>
                    newVal === values.targetLang &&
                    form.change('targetLang', null)
                  }
                />

                <FormGroupRadioButtons
                  name="targetLang"
                  label="What language are you learning?"
                  disabled={isLoading || submitting}
                  validate={composeValidators(required)}
                  options={AVAILABLE_LANGS_OPTIONS.map((o) => ({
                    ...o,
                    disabled: values.nativeLang === o.value,
                  }))}
                />
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  label="Save"
                  loading={isLoading}
                  className="w-full md:w-64"
                />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default InitProfileForm;
