'use client';
import { Field, Form } from 'react-final-form';
import { Button } from 'primereact/button';

import FormGroupRadioButtons from '@/components/FormGroupRadioButtons/FormGroupRadioButtons';
import FormInputText from '@/components/FormInputText/FormInputText';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import {
  composeValidators,
  required,
  minLen,
  maxLen,
} from '@/utils/validators';
import { AvailableLangs } from '@/types/langs';
import { AVAILABLE_LANGS_OPTIONS } from '@/constants/langs';
import { addNewPhrasePage } from '@/config/routes';
import {
  selectUserProfile,
  initProfileRequest,
} from '@/features/InitProfilePage/userProfileSlice';
import { UserProfile } from '@/types/auth';

interface InitialValues {
  firstName: string;
  targetLang: AvailableLangs;
  nativeLang: AvailableLangs;
}

const InitProfileForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(selectUserProfile);

  const onSubmit = (values: InitialValues) => {
    dispatch(initProfileRequest(values)).then((response) => {
      (response.payload as UserProfile)?.id &&
        router.push(addNewPhrasePage.path);
    });
  };
  const isLoading = false;

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl">
        <h1 className="flex-wrap pt-6">
          <span>Welcome!</span>
          <span>Let&apos;s set up your profile.</span>
        </h1>
        <Form<InitialValues>
          onSubmit={onSubmit}
          initialValues={{
            firstName: userProfile?.firstName,
            targetLang: 'en',
            nativeLang: undefined,
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
                  name="targetLang"
                  label="What language are you learning?"
                  disabled={isLoading || submitting}
                  validate={composeValidators(required)}
                  options={AVAILABLE_LANGS_OPTIONS}
                />
                <FormGroupRadioButtons
                  name="nativeLang"
                  label="What's your native language?"
                  disabled={isLoading || submitting}
                  validate={composeValidators(required)}
                  options={AVAILABLE_LANGS_OPTIONS.map((o) => ({
                    ...o,
                    disabled: values.targetLang === o.value,
                  }))}
                  customOnChange={(newVal: string) =>
                    newVal === values.nativeLang &&
                    form.change('nativeLang', undefined)
                  }
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
