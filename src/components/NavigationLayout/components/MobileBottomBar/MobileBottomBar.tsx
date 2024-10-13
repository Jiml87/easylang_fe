import { FC, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useClickOutside } from 'primereact/hooks';
import { useSwipeable } from 'react-swipeable';

import { LogOutButton } from '@/components/LogOutButton/LogOutButton';
import { AddToHomeScreen } from '@/components/NavigationLayout/components/AddToHomeScreen/AddToHomeScreen';
import './MobileBottomBar.css';

interface MobileBottomBarProps {
  opened: boolean;
  setOpen(_opened: boolean): void;
}

export const MobileBottomBar: FC<MobileBottomBarProps> = ({
  opened,
  setOpen,
}) => {
  const overlayRef = useRef(null);
  useClickOutside(overlayRef, () => {
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
        <LogOutButton classNames="separated" />
      </div>
    </div>
  );
};
