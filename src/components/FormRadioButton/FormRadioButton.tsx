'use client';
import { FC, useCallback } from 'react';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { FieldRenderProps } from 'react-final-form';
import { twMerge } from 'tailwind-merge';

interface FormRadioButtonProps extends FieldRenderProps<string, HTMLElement> {
  label: string;
  // eslint-disable-next-line no-unused-vars
  customOnChange?: (value: string) => void;
  disabled?: boolean;
}

const FormRadioButton: FC<FormRadioButtonProps> = ({
  input,
  label,
  disabled,
  customOnChange,
}) => {
  const onChange = useCallback(
    (event: RadioButtonChangeEvent) => {
      input.onChange(event);
      customOnChange &&
        customOnChange((event.target as HTMLInputElement).value);
    },
    [input, customOnChange],
  );

  return (
    <div className="align-items-center flex">
      <RadioButton
        inputId={`${input.name}-${input.value}`}
        name={input.name}
        value={input.value}
        onChange={onChange}
        checked={input.checked}
        disabled={disabled}
      />

      <label
        htmlFor={`${input.name}-${input.value}`}
        className={twMerge(
          'ml-1 cursor-pointer',
          disabled && 'cursor-default opacity-50',
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default FormRadioButton;
