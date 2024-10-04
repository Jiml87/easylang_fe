import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import './ShadowSpinner.css';

interface ShadowSpinnerProps {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
}

export const ShadowSpinner: FC<ShadowSpinnerProps> = ({
  isLoading,
  children,
  className,
}) =>
  isLoading ? (
    <div className={twMerge('shadow-spinner', className)}>
      <div className="top-gradient" />
      {children}
      <div className="bottom-gradient" />
    </div>
  ) : (
    children
  );
