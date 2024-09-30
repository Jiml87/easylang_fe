import { FC, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { LearningWordForToday } from '@/types/word';
import {
  TargetWordSentences,
  TargetWordAntonymSynonyms,
  TargetWordTranslation,
  WordListToLearnToday,
} from './TargetWordHelpers';

type HelperComponent =
  | 'TargetWordSentences'
  | 'TargetWordAntonymSynonyms'
  | 'TargetWordTranslation'
  | 'WordListToLearnToday';

const HelperPopups: Record<HelperComponent, FC<any>> = {
  TargetWordSentences: TargetWordSentences,
  TargetWordAntonymSynonyms: TargetWordAntonymSynonyms,
  TargetWordTranslation: TargetWordTranslation,
  WordListToLearnToday: WordListToLearnToday,
};

type HelperState = {
  header: string;
  available: boolean;
  content: HelperComponent;
};

interface HelpersListProps {
  data: LearningWordForToday;
}

export const HelpersList: FC<HelpersListProps> = ({ data }) => {
  const [helpers, setHelpers] = useState<Array<HelperState>>();
  const [showedHelper, setShowedHelper] = useState<HelperState | null>();

  useEffect(() => {
    const { synonyms, antonym } = data.targetWord.practice;
    const helpersList: HelperState[] = [];
    helpersList.push({
      available: true,
      header: 'Examples of use',
      content: 'TargetWordSentences',
    });
    if (antonym || synonyms.length) {
      helpersList.push({
        available: false,
        header: 'More practice',
        content: 'TargetWordAntonymSynonyms',
      });
    }
    helpersList.push({
      available: false,
      header: 'Translation',
      content: 'TargetWordTranslation',
    });
    helpersList.push({
      available: false,
      header: 'All words to learn today',
      content: 'WordListToLearnToday',
    });
    setHelpers(helpersList);
  }, [data]);

  const onHidePopup = () => {
    setShowedHelper(null);
  };

  const onShowHelper = (helper: HelperState, index: number) => {
    setShowedHelper(helper);
    // Activate nex helper button
    if (helpers) {
      const isLastInArray = index === helpers.length - 1;
      if (!isLastInArray) {
        const nextElement = helpers[index + 1];
        !nextElement.available &&
          setHelpers(
            helpers.map((item) =>
              item.content === nextElement.content
                ? { ...item, available: true }
                : item,
            ),
          );
      }
    }
  };

  const HelperPopupContent = showedHelper
    ? HelperPopups[showedHelper.content]
    : null;

  return (
    <div>
      <div>
        <h5>Help:</h5>
        <div className="flex">
          {helpers?.map((item, index) => (
            <Button
              key={index}
              label={`${index + 1}`}
              disabled={!item.available}
              onClick={() => onShowHelper(item, index)}
              size="small"
              severity="info"
              className="mr-3"
            />
          ))}
        </div>
      </div>
      {showedHelper && (
        <Dialog
          header={showedHelper.header}
          visible={!!showedHelper}
          onHide={onHidePopup}
          breakpoints={{ '10000px': '550px', '641px': '90vw' }}
        >
          {HelperPopupContent && <HelperPopupContent data={data} />}
        </Dialog>
      )}
    </div>
  );
};
