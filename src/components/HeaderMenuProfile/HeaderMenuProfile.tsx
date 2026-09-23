import { useRef } from 'react';
import Link from 'next/link';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';

import { useAppSelector } from '@/store/hooks';
import { selectUserProfile } from '@/features/InitProfilePage/userProfileSlice';
import { LogOutButton } from '@/components/LogOutButton/LogOutButton';
import { connectAiPage } from '@/config/routes';
import './HeaderMenuProfile.css';

export const HeaderMenuProfile = () => {
  const userProfile = useAppSelector(selectUserProfile);
  const menuRef = useRef(null);

  const menuItems = [
    {
      template: (
        <Link href={connectAiPage.path} className="menu-button">
          <i className="pi pi-comments pr-2" />
          Connect AI
        </Link>
      ),
    },
    {
      template: <LogOutButton />,
    },
  ];

  return (
    <div className="HeaderMenuProfile">
      <Avatar
        label={userProfile?.firstName[0].toUpperCase()}
        size="normal"
        style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
        shape="circle"
        // @ts-ignore
        onClick={(event) => menuRef.current?.toggle(event)}
        aria-controls="popup_menu_right"
        aria-haspopup
      />
      <Menu
        className="HeaderMenuProfile_dropdown-menu"
        model={menuItems}
        popup
        ref={menuRef}
        id="popup_menu_right"
        popupAlignment="right"
      />
    </div>
  );
};
