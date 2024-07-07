'use client';
import { Form } from 'react-final-form';
import { Button } from 'primereact/button';

import FormInput from '@/shared/components/form/FormInput/FormInput';

interface InitialValues {
  nativePhrase: string;
  translatedPhrase: string;
}

const AddWordForm = () => {
  const onSubmit = (values: InitialValues) => {
    console.log(values);
  };
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
              inputClassName="w-full"
            />
            <FormInput
              name="nativePhrase"
              label="Translation"
              inputClassName="w-full"
              required={false}
            />
          </div>
          <Button label="Submit" />
        </form>
      )}
    />
  );
};

export default AddWordForm;
