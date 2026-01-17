'use client';

import { Dropdown, DropdownProps } from 'primereact/dropdown';

import { useAppSelector } from '@/store/hooks';
import { selectUserLangs } from '@/features/InitProfilePage/userProfileSlice';
import { UserTargetLang } from '@/types/langs';
import { LANG_BY_CODE } from '@/constants/langs';

interface SelectCurrentLanguageProps {
  className?: string;
  pt?: DropdownProps['pt'];
}

const getLangOptions = (targetLangs: UserTargetLang[] | null) => {
  return targetLangs?.map((lang) => ({
    label: LANG_BY_CODE[lang.lang],
    value: lang.lang,
  }));
};

export const SelectCurrentLanguage = ({
  className,
  pt,
}: SelectCurrentLanguageProps) => {
  const { targetLang, targetLangs } = useAppSelector(selectUserLangs);

  if (!targetLangs || targetLangs.length < 2) return null;

  return (
    <div className={className}>
      <Dropdown
        value={targetLang}
        options={getLangOptions(targetLangs)}
        onChange={(e) => {
          console.log('e: ', e);
        }}
        variant="outlined"
        pt={pt}
      />
    </div>
  );
};
