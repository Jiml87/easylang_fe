import { FC, Fragment } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { selectCurrentTargetLanguage } from '@/features/InitProfilePage/userProfileSlice';
import { useAppSelector } from '@/store/hooks';

import { Word } from '@/types/word';

interface WordDetailsPopupProps {
  visible: boolean;
  onHide: () => void;
  data: Word;
}

export const WordDetailsPopup: FC<WordDetailsPopupProps> = ({
  visible,
  onHide,
  data,
}) => {
  const targetLang = useAppSelector(selectCurrentTargetLanguage);
  const onSpeechTargetWord = () => {
    if (!targetLang || !data) {
      return;
    }
    const voiceObj = new SpeechSynthesisUtterance(data?.targetWord.targetText);
    voiceObj.lang = targetLang;
    window.speechSynthesis.speak(voiceObj);
  };

  return (
    <Dialog
      header={() => (
        <div className="flex items-center">
          <h3 className="my-0">{data?.targetWord.targetText}</h3>
          <Button
            className="ml-2 text-sm"
            icon="pi pi-volume-up"
            rounded
            text
            onClick={onSpeechTargetWord}
          />
        </div>
      )}
      visible={visible}
      onHide={onHide}
      breakpoints={{ '10000px': '550px', '641px': '90vw' }}
    >
      <div>
        <h3 className="mt-0">Definition:</h3>
        <div className="text-sm text-zinc-700">
          {data.targetWord.practice.description?.text}
        </div>
        {data.targetWord.practice?.examples && (
          <Fragment>
            <h3>Examples of use:</h3>
            <ul>
              {data.targetWord.practice.examples.map((sentence, index) => (
                <li key={index} className="py-1 text-sm text-zinc-700">
                  {index + 1}. {sentence.text}
                </li>
              ))}
            </ul>
          </Fragment>
        )}
        {data.targetWord.practice?.antonym && (
          <Fragment>
            <h3>
              Antonym <i className="text-xs">(the opposite meaning)</i>:
            </h3>
            <div className="text-sm text-zinc-700">
              {data.targetWord.practice?.antonym?.text}
            </div>
          </Fragment>
        )}

        {!!data.targetWord.practice?.synonyms.length && (
          <Fragment>
            <h3>
              Synonyms <i className="text-xs">(the similar meaning)</i>:
            </h3>
            <ul>
              {data.targetWord.practice.synonyms.map((item, index) => (
                <li key={index} className="pb-2 text-sm text-zinc-700">
                  {index + 1}. {item.text}
                </li>
              ))}
            </ul>
          </Fragment>
        )}
        <h3>Translation:</h3>
        <div className="text-sm text-zinc-700">{data.nativeCustomText}</div>
      </div>
    </Dialog>
  );
};
