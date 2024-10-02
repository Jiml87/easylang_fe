import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectLogoutStatus,
  logOutRequest,
} from '@/features/InitProfilePage/userProfileSlice';
import { ProgressSpinner } from 'primereact/progressspinner';

interface LogOutButtonProps {
  classNames?: string;
}

export const LogOutButton: FC<LogOutButtonProps> = ({
  classNames,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLogoutStatus);
  const handleLogOut = () => {
    dispatch(logOutRequest(null));
  };

  return (
    <div
      {...props}
      role="button"
      className={twMerge('menu-button danger', classNames)}
      onClick={handleLogOut}
    >
      <div className="flex items-center">
        <i className="pi pi-sign-out pr-2" />
        <span>Logout</span>
      </div>
      {isLoading && (
        <ProgressSpinner style={{ width: '16px', height: '16px' }} />
      )}
    </div>
  );
};
