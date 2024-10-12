import { memo, useEffect, useCallback } from 'react';
import { useForm } from 'react-final-form';
import debounce from 'lodash.debounce';

import axios from '@/api/axiosInstance';
import { useAppSelector } from '@/store/hooks';
import { selectUserLangs } from '@/features/InitProfilePage/userProfileSlice';

const AutoTranslation = memo(function Transl({
  targetText,
  setLoading,
}: {
  targetText: string;
  setLoading(_loading: boolean): void;
}) {
  const form = useForm();

  const { nativeLang, targetLang } = useAppSelector(selectUserLangs);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useCallback(
    debounce(async (targetText: string) => {
      if (!targetText || targetText.length < 2) {
        return;
      }
      try {
        setLoading(true);
        const results = await axios.post(`/v1/translate`, {
          q: targetText.trim(),
          target: nativeLang,
          source: targetLang,
        });

        setLoading(false);
        if (results.data.translatedText) {
          form.change('nativeText', results.data.translatedText);
          form.change('nativeCustomText', results.data.translatedText);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }, 600),
    [],
  );

  useEffect(() => {
    debouncedChangeHandler(targetText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetText]);

  return null;
});

export default AutoTranslation;
