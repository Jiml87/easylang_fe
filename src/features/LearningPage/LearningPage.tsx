import { FC, useState, useMemo } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';

import { selectLearningWordsForToday } from '@/features/DictionaryPage/dictionarySlice';
import { generateRandomKey } from '@/utils/generateRandomKey';
import { CustomInput } from './components/CustomInput/CustomInput';
import { HelpersList } from './components/TargetWordHelpers/HelpersList';
import { learnWordForToday, selectLearningWordStatus } from './learningSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import './LearningPage.css';

const LearningPage: FC = () => {
  const dispatch = useAppDispatch();
  const [tokens, setTokens] = useState<Record<number, string>>({});

  const learningWordsForToday = useAppSelector(selectLearningWordsForToday);
  const isPending = useAppSelector(selectLearningWordStatus) === 'pending';

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

  const saveResult = () => {
    if (!oneLearningItem) {
      return;
    }
    dispatch(
      learnWordForToday({
        id: oneLearningItem.id,
        prevDay: oneLearningItem.passedLearningDay,
      }),
    );
  };
  console.log('learningWordsForToday', learningWordsForToday);

  if (learningWordsForToday.length === 0) {
    return (
      <div className="LearningPage">
        <div className="default-text mt-10">
          There&apos;s nothing to learn today
        </div>
      </div>
    );
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
          onClick={saveResult}
          disabled={validateAnswer()}
          loading={isPending}
          label="Save"
          className="w-full pb-6 sm:w-auto sm:self-center sm:px-24"
        />
      </div>
    </div>
  );
};

export default LearningPage;
