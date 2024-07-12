import { FC, ReactElement } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { InputText } from 'primereact/inputtext';

type FormInputTextProps = FieldRenderProps<string, HTMLElement> & {
  name: string;
  label: string;
  subLabel?: string | ReactElement;
  inputClassName?: string;
  type?: 'text' | 'password';
};

const FormInputText: FC<FormInputTextProps> = ({
  input,
  meta,
  label,
  subLabel,
  inputClassName,
  name,
  type = 'text',
  ...rest
}) => {
  return (
    <div className="mb-2">
      <label className="text-sm text-gray-500" htmlFor={name}>
        {label}
        {subLabel}
      </label>
      <InputText
        className={inputClassName}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        type={type}
        id={name}
        invalid={meta.submitFailed && meta.invalid}
        aria-labelledby={label}
        {...rest}
      />
      <div className="min-h-5 text-sm text-red-600">
        {meta.submitFailed && meta.invalid && meta.error}
      </div>
    </div>
  );
};

export default FormInputText;
