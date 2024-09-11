import { memo, useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-final-form';
import debounce from 'lodash.debounce';

import axios from '@/api/axiosInstance';
import { useAppSelector } from '@/store/hooks';
import { selectUserLangs } from '@/features/InitProfilePage/userProfileSlice';
import { isDevelopment } from '@/constants/env';

const AutoTranslation = memo(function Transl({
  targetPhrase,
}: {
  targetPhrase: string;
}) {
  const { current: controller } = useRef(new AbortController());
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
        console.log('controller', form);

        if (results.data.translatedText) {
          form.change('nativePhrase', results.data.translatedText);
        }
      } catch (error) {
        console.error(error);
      }
    }, 600),
    [],
  );

  useEffect(() => {
    debouncedChangeHandler(targetPhrase);

    return () => {
      !isDevelopment && controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPhrase]);

  return null;
});

export default AutoTranslation;
