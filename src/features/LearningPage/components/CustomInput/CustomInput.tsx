import { twMerge } from 'tailwind-merge';

export const CustomInput = ({
  events,
  props,
  originalText,
}: {
  originalText: string;
  props: any;
  events: any;
}) => {
  const value = props.value;

  return (
    <input
      {...events}
      {...props}
      key={props.key}
      type="text"
      className={twMerge(
        'p-inputotp-input p-inputtext p-component p-filled input',
        value && value !== originalText[props.id] ? 'invalid' : '',
        value && value === originalText[props.id] ? 'valid' : '',
      )}
    />
  );
};
