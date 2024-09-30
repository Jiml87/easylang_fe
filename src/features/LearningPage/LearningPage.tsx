import { FC, useState, useMemo } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';

import { useAppSelector } from '@/store/hooks';
import { selectLearningWordsForToday } from '@/features/DictionaryPage/dictionarySlice';
import { generateRandomKey } from '@/utils/generateRandomKey';
import { CustomInput } from './components/CustomInput/CustomInput';
import { HelpersList } from './components/TargetWordHelpers/HelpersList';

import './LearningPage.css';

const LearningPage: FC = () => {
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
      (acc, _item, index) => {
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

  const validateAnswer = () => {
    return !splitText.every(({ text }, index) => text === tokens[index]);
  };

  if (!learningWordsForToday.length) {
    <div className="LearningPage">
      <div className="default-text">Nothing learn today</div>
    </div>;
  }

  return (
    <div className="LearningPage">
      <div className="grow sm:grow-0">
        <div>
          <h5>Definition:</h5>
          <div className="text-sm text-gray-800">
            {oneLearningItem?.descriptionWithHiddenTarget}
          </div>
        </div>
        {oneLearningItem && <HelpersList data={oneLearningItem} />}
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
      <div className="flex justify-center sm:mt-10">
        <Button
          label="Save"
          className="w-auto pb-6 sm:w-fit sm:self-center sm:px-24"
          disabled={validateAnswer()}
        />
      </div>
    </div>
  );
};

export default LearningPage;
