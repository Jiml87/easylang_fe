import { FC, RefObject, useRef } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { useClickOutside } from 'primereact/hooks';
import { useSwipeable } from 'react-swipeable';

import { LogOutButton } from '@/components/LogOutButton/LogOutButton';
import { AddToHomeScreen } from '@/components/NavigationLayout/components/AddToHomeScreen/AddToHomeScreen';
import { connectAiPage } from '@/config/routes';
import './MobileBottomBar.css';

interface MobileBottomBarProps {
  opened: boolean;
  setOpen(_opened: boolean): void;
}

export const MobileBottomBar: FC<MobileBottomBarProps> = ({
  opened,
  setOpen,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  useClickOutside(overlayRef as RefObject<Element>, () => {
    setOpen(false);
  });
  const handlers = useSwipeable({
    onSwiped: (_eventData) => {
      setOpen(false);
    },
  });

  return (
    <div
      {...handlers}
      className={twMerge('MobileBottomBar', opened && 'opened')}
      ref={overlayRef}
    >
      <div>
        <AddToHomeScreen />
      </div>
      <div>
        <Link
          href={connectAiPage.path}
          className="menu-button separated"
          onClick={() => setOpen(false)}
        >
          <i className="pi pi-comments mr-2" />
          <span>Connect AI</span>
        </Link>
      </div>
      <div>
        <LogOutButton classNames="separated" />
      </div>
    </div>
  );
};
