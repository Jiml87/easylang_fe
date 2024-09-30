import { FC, useState, useMemo } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';
import { twMerge } from 'tailwind-merge';

import { useAppSelector } from '@/store/hooks';
import { selectLearningWordsForToday } from '@/features/DictionaryPage/dictionarySlice';
import { generateRandomKey } from '@/utils/generateRandomKey';
import './LearningPage.css';

interface LearningPageProps {}

const CustomInput = ({
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

const LearningPage: FC<LearningPageProps> = () => {
  const [tokens, setTokens] = useState<Record<number, string>>({});
  const learningWordsForToday = useAppSelector(selectLearningWordsForToday);

  const oneLearningItem = learningWordsForToday.length
    ? learningWordsForToday[learningWordsForToday.length - 1]
    : null;

  const splitText = useMemo(() => {
    const targetText =
      oneLearningItem?.targetWord.targetText || ''.toLowerCase();
    const splitText = targetText.split(' ');
    const reduced = splitText.reduce(
      (acc, item, index) => {
        acc[index] = '';
        return acc;
      },
      {} as Record<number, string>,
    );
    setTokens(reduced);
    return splitText.map((text, index) => ({
      text,
      key: generateRandomKey(index),
    }));
  }, [oneLearningItem]);

  if (!learningWordsForToday.length) {
    <div className="LearningPage">
      <div className="default-text">Nothing learn today</div>
    </div>;
  }

  const validateAnswer = () => {
    return !splitText.every(({ text }, index) => text === tokens[index]);
  };

  return (
    <div className="LearningPage">
      <div className="grow">
        <div>
          <h5>Definition:</h5>
          <div className="text-sm text-gray-800">
            {oneLearningItem?.descriptionWithHiddenTarget}
          </div>
        </div>
        <div>
          <h5>Help:</h5>
          <div className="flex">
            <Button label="1" size="small" severity="info" className="mr-2" />
            <Button
              label="2"
              disabled
              size="small"
              severity="info"
              className="mr-2"
            />
          </div>
        </div>
        <h5>Enter the answer:</h5>
        <div className="answer-wrapper">
          {splitText.map((item, index) => (
            <div
              className={!!splitText.length ? 'mb-5 mr-8' : ''}
              key={item.key}
            >
              <InputOtp
                key={item.key}
                value={tokens[index]}
                onChange={(e) => {
                  setTokens({ ...tokens, [index]: e.value as string });
                }}
                length={item.text.length}
                inputTemplate={(props: any) => (
                  <CustomInput {...props} originalText={item.text} />
                )}
                style={{ gap: 6 }}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button
          label="Save"
          className="w-full pb-6 sm:self-center sm:px-14"
          disabled={validateAnswer()}
        />
      </div>
    </div>
  );
};

export default LearningPage;
