import { FC, ReactElement } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';

type FormInputTextProps = FieldRenderProps<string, HTMLElement> & {
  label: string;
  subLabel?: string | ReactElement;
  inputClassName?: string;
  rows?: number;
  autoResize?: boolean;
  loading?: boolean;
};

export const FormTextArea: FC<FormInputTextProps> = ({
  input,
  meta,
  label,
  subLabel,
  inputClassName,
  rows = 2,
  autoResize = true,
  loading,
  ...rest
}) => {
  return (
    <div className="mt-2">
      <label
        className="text-sm text-gray-500"
        htmlFor={input.name}
        id={`input-${name}`}
      >
        {label}
        {subLabel}
      </label>
      <div className="relative">
        {loading && (
          <div className="absolute right-1 top-1">
            <ProgressSpinner style={{ width: '16px', height: '16px' }} />
          </div>
        )}
        <InputTextarea
          className={inputClassName}
          name={input.name}
          value={input.value}
          onChange={input.onChange}
          id={input.name}
          invalid={meta.submitFailed && meta.invalid}
          // aria-labelledby={`input-${name}`}
          rows={rows}
          autoResize={autoResize}
          {...rest}
        />
      </div>
      <div className="min-h-5 text-sm text-red-600">
        {meta.submitFailed && meta.invalid && meta.error}
      </div>
    </div>
  );
};

export default FormTextArea;
