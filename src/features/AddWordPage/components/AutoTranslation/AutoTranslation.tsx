import { memo, useEffect, useCallback } from 'react';
import { useForm } from 'react-final-form';
import debounce from 'lodash.debounce';

import axios from '@/api/axiosInstance';
import { useAppSelector } from '@/store/hooks';
import { selectUserLangs } from '@/features/InitProfilePage/userProfileSlice';

const controller = new AbortController();

const AutoTranslation = memo(function Transl({
  targetPhrase,
}: {
  targetPhrase: string;
}) {
  const form = useForm();

  const { nativeLang, targetLang } = useAppSelector(selectUserLangs);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useCallback(
    debounce(async (targetPhrase: string) => {
      if (!targetPhrase || targetPhrase.length < 2) {
        return;
      }
      try {
        const results = await axios.post(
          `/v1/translate`,
          { q: targetPhrase.trim(), target: nativeLang, source: targetLang },
          { signal: controller.signal },
        );
        if (results.data.translatedText) {
          form.change('nativePhrase', results.data.translatedText);
        }
      } catch (error) {
        console.error(error);
      }
    }, 500),
    [],
  );

  useEffect(() => {
    debouncedChangeHandler(targetPhrase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPhrase]);

  return null;
});

export default AutoTranslation;
