import { ReactElement } from 'react';
import { Field, useField } from 'react-final-form';

import FormRadioButton from '../FormRadioButton/FormRadioButton';

interface FormGroupRadioButtonsProps {
  name: string;
  label: string;
  disabled: boolean;
  subLabel?: string | ReactElement;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  // eslint-disable-next-line no-unused-vars
  customOnChange?: (value: string) => void;
  // eslint-disable-next-line no-unused-vars
  validate?: (value: any) => string | undefined;
}

export default function FormGroupRadioButtons({
  name,
  label,
  subLabel,
  disabled,
  options,
  customOnChange,
  validate,
}: FormGroupRadioButtonsProps) {
  const { meta } = useField(name);

  return (
    <div className="mt-2">
      <label className="text-sm text-gray-500">
        {label}
        {subLabel}
      </label>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <Field
            component={FormRadioButton}
            {...option}
            type="radio"
            key={option.value}
            name={name}
            customOnChange={customOnChange}
            disabled={option.disabled || disabled}
            validate={validate}
          />
        ))}
      </div>
      <div className="min-h-5 text-sm text-red-600">
        {meta.submitFailed && meta.invalid && meta.error}
      </div>
    </div>
  );
}
