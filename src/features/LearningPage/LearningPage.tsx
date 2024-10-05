import { FC, useState, useMemo } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';

import { selectLearningWordsForToday } from '@/features/DictionaryPage/dictionarySlice';
import { generateRandomKey } from '@/utils/generateRandomKey';
import { CustomInput } from './components/CustomInput/CustomInput';
import { HelpersList } from './components/TargetWordHelpers/HelpersList';
import { learnWordForToday, selectLearningWordStatus } from './learningSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ShadowSpinner } from '@/components/ShadowSpinner/ShadowSpinner';

import './LearningPage.css';

const LearningPage: FC = () => {
  const dispatch = useAppDispatch();
  const [tokens, setTokens] = useState<Record<number, string>>({});

  const learningWordsForToday = useAppSelector(selectLearningWordsForToday);
  const status = useAppSelector(selectLearningWordStatus);
  const isPending = status === 'pending';

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
          <div className="text-sm text-zinc-700">
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
        <ShadowSpinner isLoading={isPending} className="w-full sm:w-auto">
          <Button
            onClick={saveResult}
            disabled={isPending || validateAnswer()}
            label="Save"
            className="w-full pb-6 sm:w-auto sm:self-center sm:px-24"
          />
        </ShadowSpinner>
      </div>
    </div>
  );
};

export default LearningPage;
