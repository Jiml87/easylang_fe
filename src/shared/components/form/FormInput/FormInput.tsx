import { FC } from 'react';
import { useField } from 'react-final-form';
import { InputText } from 'primereact/inputtext';

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  type?: 'text' | 'password';
  required?: boolean;
}

const FormInput: FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  inputClassName,
  type = 'text',
  required = true,
}) => {
  const { input } = useField(name);
  return (
    <div className="mb-5">
      <label htmlFor={name}>
        {label}
        <small> {required ? '*' : '(you can add later)'}</small>
      </label>
      <InputText
        className={inputClassName}
        placeholder={placeholder}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        type={type}
        id={name}
      />
    </div>
  );
};

export default FormInput;
