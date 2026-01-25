import { twMerge } from 'tailwind-merge';
import { useEffect, useRef } from 'react';

export const CustomInput = ({
  events,
  props,
  originalText,
  onBackspaceWhenEmpty,
}: {
  originalText: string;
  props: any;
  events: any;
  onBackspaceWhenEmpty?: () => void;
}) => {
  const value = props.value;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input || !onBackspaceWhenEmpty) return;

    const handleBeforeInput = (e: any) => {
      if (e.inputType === 'deleteContentBackward') {
        const target = e.target as HTMLInputElement;

        const parentDiv = target.closest('.p-inputotp');
        const allInputs = parentDiv?.querySelectorAll('input') || [];
        const allEmpty = Array.from(allInputs).every(
          (inp) => !(inp as HTMLInputElement).value,
        );

        if (allEmpty && !target.value) {
          e.preventDefault();
          onBackspaceWhenEmpty();
        }
      }
    };

    input.addEventListener('beforeinput', handleBeforeInput);

    return () => {
      input.removeEventListener('beforeinput', handleBeforeInput);
    };
  }, [onBackspaceWhenEmpty]);

  return (
    <input
      {...events}
      {...props}
      ref={inputRef}
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
