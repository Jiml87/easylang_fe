import { ReactNode, useState } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge } from 'primereact/badge';

import { addNewPhrasePage, dictionaryPage, rootPage } from '@/config/routes';
import { useAppSelector } from '@/store/hooks';
import Logo from '@/components/Logo/Logo';
import { selectNumberLearningWordsForToday } from '@/features/DictionaryPage/dictionarySlice';
import { HeaderMenuProfile } from '@/components/HeaderMenuProfile/HeaderMenuProfile';
import { MobileBottomBar } from './components/MobileBottomBar/MobileBottomBar';
import './NavigationLayout.css';

interface NavigationLayoutProps {
  children: ReactNode;
}

const NavigationLayout = ({ children }: NavigationLayoutProps) => {
  const router = useRouter();
  const [openedMobileBar, setOpenedMobileBar] = useState<boolean>(false);
  const handleOpenMobileFooterPopup = () => setOpenedMobileBar(true);
  const countLearningWords = useAppSelector(selectNumberLearningWordsForToday);
  return (
    <section className="mx-auto flex h-dvh max-w-4xl flex-col">
      <div className="-z-1 fixed left-0 right-0 flex justify-center">
        <div
          className="w-1/4 sm:w-1/5"
          style={{ boxShadow: '0px  0 75px 35px #94ffbf' }}
        />
      </div>
      <header className="flex justify-between p-2 align-middle">
        <Logo />
        <div className="flex items-center">
          <div className="hidden justify-end align-middle sm:flex">
            <Link
              href={rootPage.path}
              className="px-5 py-2 text-slate-600 hover:underline"
            >
              Home
            </Link>
            <Link
              href={addNewPhrasePage.path}
              className="px-5 py-2 text-slate-600 hover:underline"
            >
              Add word
            </Link>
            <Link
              href={dictionaryPage.path}
              className="px-5 py-2 text-slate-600 hover:underline"
            >
              Dictionary
            </Link>
          </div>
          <HeaderMenuProfile />
        </div>
      </header>
      <div className="grow">{children}</div>
      <nav className="flex justify-between border-t bg-white px-6 py-1 text-slate-500 sm:hidden">
        <Button
          icon="pi pi-list text-xl"
          rounded
          text
          severity="secondary"
          aria-label="Dictionary"
          link
          onClick={() => router.push(dictionaryPage.path)}
          className="relative"
        >
          {!!countLearningWords && (
            <Badge
              value={countLearningWords}
              severity="danger"
              className="notifications"
            />
          )}
        </Button>
        <Button
          icon="pi pi-plus text-xl"
          rounded
          text
          severity="secondary"
          aria-label="Add"
          link
          onClick={() => router.push(addNewPhrasePage.path)}
        />
        <Button
          icon="pi pi-chevron-up text-xl"
          rounded
          text
          severity="secondary"
          aria-label="Open"
          link
          onClick={handleOpenMobileFooterPopup}
        />
      </nav>
      <MobileBottomBar opened={openedMobileBar} setOpen={setOpenedMobileBar} />
    </section>
  );
};

export default NavigationLayout;
