import { FC, ReactElement } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { InputTextarea } from 'primereact/inputtextarea';

type FormInputTextProps = FieldRenderProps<string, HTMLElement> & {
  name: string;
  label: string;
  subLabel?: string | ReactElement;
  inputClassName?: string;
  rows?: number;
  autoResize?: boolean;
};

const FormTextArea: FC<FormInputTextProps> = ({
  input,
  meta,
  label,
  subLabel,
  inputClassName,
  name,
  rows = 2,
  autoResize = true,
  ...rest
}) => {
  return (
    <div className="mt-2">
      <label className="text-sm text-gray-500" htmlFor={name}>
        {label}
        {subLabel}
      </label>
      <InputTextarea
        className={inputClassName}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        id={name}
        invalid={meta.submitFailed && meta.invalid}
        aria-labelledby={label}
        rows={rows}
        autoResize={autoResize}
        {...rest}
      />
      <div className="min-h-5 text-sm text-red-600">
        {meta.submitFailed && meta.invalid && meta.error}
      </div>
    </div>
  );
};

export default FormTextArea;
