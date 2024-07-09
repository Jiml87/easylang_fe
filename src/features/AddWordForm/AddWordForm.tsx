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
              subLabel={<small>*</small>}
              inputClassName="w-full"
            />
            <FormInput
              name="nativePhrase"
              label="Translation"
              subLabel={<small>(you can add later)</small>}
              inputClassName="w-full"
            />
          </div>
          <Button label="Save" />
        </form>
      )}
    />
  );
};

export default AddWordForm;
