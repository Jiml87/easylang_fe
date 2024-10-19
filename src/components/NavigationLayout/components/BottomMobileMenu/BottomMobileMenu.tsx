import { useState } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { Badge } from 'primereact/badge';

import { addNewPhrasePage, dictionaryPage } from '@/config/routes';
import { useAppSelector } from '@/store/hooks';
import { selectNumberLearningWordsForToday } from '@/features/DictionaryPage/dictionarySlice';
import { MobileBottomBar } from '../MobileBottomBar/MobileBottomBar';

export const BottomMobileMenu = () => {
  const router = useRouter();
  const [openedMobileBar, setOpenedMobileBar] = useState<boolean>(false);
  const handleOpenMobileFooterPopup = () => setOpenedMobileBar(true);
  const countLearningWords = useAppSelector(selectNumberLearningWordsForToday);

  return (
    <>
      <nav className="mobile-navigation-bar">
        <Button
          onClick={() => router.push(dictionaryPage.path)}
          className="mobile-navigation-button"
          icon="pi pi-list text-base"
          rounded
          text
          severity="secondary"
          aria-label="Dictionary"
          link
        >
          {!!countLearningWords && (
            <Badge
              value={countLearningWords}
              severity="danger"
              className="footer-count-words"
            />
          )}
          <span className="btn-text">Dictionary</span>
        </Button>
        <Button
          onClick={() => router.push(addNewPhrasePage.path)}
          className="mobile-navigation-button"
          icon="pi pi-plus text-base"
          rounded
          text
          severity="secondary"
          aria-label="Add"
          link
        >
          <span className="btn-text">Add Word</span>
        </Button>
        <Button
          onClick={handleOpenMobileFooterPopup}
          className="mobile-navigation-button"
          icon="pi pi-chevron-up text-base"
          rounded
          text
          severity="secondary"
          aria-label="Open"
          link
        >
          <span className="btn-text">More</span>
        </Button>
      </nav>
      <MobileBottomBar opened={openedMobileBar} setOpen={setOpenedMobileBar} />
    </>
  );
};
