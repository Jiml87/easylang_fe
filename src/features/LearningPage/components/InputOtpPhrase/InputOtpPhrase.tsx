import { InputOtp } from 'primereact/inputotp';
import { CustomInput } from '../CustomInput/CustomInput';
import { Dispatch, SetStateAction, useRef } from 'react';

interface InputOtpPhraseProps {
  splitText: { text: string; key: string }[];
  setTokens: Dispatch<SetStateAction<Record<number, string>>>;
  tokens: Record<number, string>;
}
export const InputOtpPhrase = ({
  splitText,
  setTokens,
  tokens,
}: InputOtpPhraseProps) => {
  const inputRefs = useRef<Array<HTMLDivElement | null>>([]);
  const previousTokensRef = useRef<Record<number, string>>({});

  const handleChange = (index: number, value: string) => {
    const newValue = value.toLowerCase();
    const newTokens = {
      ...tokens,
      [index]: newValue,
    };

    setTokens(newTokens);

    const previousValue = previousTokensRef.current[index] || '';
    const isWordJustCompleted =
      previousValue.length < splitText[index].text.length &&
      newValue.length === splitText[index].text.length;
    const isNotLastWord = index < splitText.length - 1;

    if (isWordJustCompleted && isNotLastWord) {
      setTimeout(() => {
        const nextInputOtp = inputRefs.current[index + 1];
        if (nextInputOtp) {
          const firstInput = nextInputOtp.querySelector('input');
          if (firstInput) {
            firstInput.focus();
          }
        }
      }, 0);
    }

    previousTokensRef.current = newTokens;
  };

  const handleBackspaceWhenEmpty = (index: number) => {
    if (index === 0) return;

    const prevValue = tokens[index - 1] || '';
    if (prevValue.length > 0) {
      const newPrevValue = prevValue.slice(0, -1);
      setTokens({
        ...tokens,
        [index - 1]: newPrevValue,
      });
    }

    setTimeout(() => {
      const prevInputOtp = inputRefs.current[index - 1];
      if (prevInputOtp) {
        const prevInputs = prevInputOtp.querySelectorAll('input');
        const lastInput = prevInputs[prevInputs.length - 1] as HTMLInputElement;
        if (lastInput) {
          lastInput.focus();
          requestAnimationFrame(() => {
            const length = lastInput.value.length;
            lastInput.setSelectionRange(length, length);
          });
        }
      }
    }, 0);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      const currentValue = tokens[index] || '';
      const currentInputOtp = inputRefs.current[index];
      const activeElement = document.activeElement as HTMLInputElement;
      const allInputs = currentInputOtp?.querySelectorAll('input') || [];
      const isFirstInput = allInputs[0] === activeElement;
      const isFirstInputEmpty = activeElement.value === '';

      if (currentValue.length === 0 || (isFirstInput && isFirstInputEmpty)) {
        if (index > 0) {
          e.preventDefault();
          handleBackspaceWhenEmpty(index);
        }
      }
    }
  };

  return (
    <div className="answer-wrapper">
      {splitText.map((item, index) => (
        <div
          className={!!splitText.length ? 'mb-5 mr-8' : ''}
          key={item.key}
          ref={(el) => (inputRefs.current[index] = el)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        >
          <InputOtp
            key={item.key}
            value={tokens[index]}
            onChange={(e) => {
              handleChange(index, e.value?.toString() || '');
            }}
            length={item.text.length}
            inputTemplate={(props: any) => (
              <CustomInput
                {...props}
                originalText={item.text}
                onBackspaceWhenEmpty={() => handleBackspaceWhenEmpty(index)}
                wordValue={tokens[index]}
              />
            )}
            style={{ gap: 6 }}
          />
        </div>
      ))}
    </div>
  );
};
