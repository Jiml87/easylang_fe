import { memo, useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-final-form';
import debounce from 'lodash.debounce';

import axios from '@/api/axiosInstance';
import { useAppSelector } from '@/store/hooks';
import { selectUserLangs } from '@/features/InitProfilePage/userProfileSlice';
import { isDevelopment } from '@/constants/env';

const AutoTranslation = memo(function Transl({
  targetText,
  setLoading,
}: {
  targetText: string;
  setLoading(_loading: boolean): void;
}) {
  const { current: controller } = useRef(new AbortController());
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
        const results = await axios.post(
          `/v1/translate`,
          { q: targetText.trim(), target: nativeLang, source: targetLang },
          { signal: controller.signal },
        );
        setLoading(false);

        if (results.data.translatedText) {
          form.change('nativeText', results.data.translatedText);
          form.change('nativeCustomText', results.data.translatedText);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }, 600),
    [],
  );

  useEffect(() => {
    debouncedChangeHandler(targetText);

    return () => {
      !isDevelopment && controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetText]);

  return null;
});

export default AutoTranslation;
