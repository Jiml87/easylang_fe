import { FC, ReactElement } from 'react';
import { useField } from 'react-final-form';
import { InputText } from 'primereact/inputtext';

interface FormInputProps {
  name: string;
  label: string;
  subLabel?: string | ReactElement;
  placeholder?: string;
  inputClassName?: string;
  type?: 'text' | 'password';
  disabled?: boolean;
}

const FormInput: FC<FormInputProps> = ({
  name,
  label,
  subLabel,
  placeholder,
  inputClassName,
  type = 'text',
  disabled = false,
}) => {
  const { input } = useField(name);
  return (
    <div className="mb-5">
      <label htmlFor={name}>
        {label}
        {subLabel}
      </label>
      <InputText
        className={inputClassName}
        placeholder={placeholder}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        type={type}
        id={name}
        disabled={disabled}
      />
    </div>
  );
};

export default FormInput;
