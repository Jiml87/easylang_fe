import { AxiosError } from 'axios';

import { KnownError } from '@/queries/axiosInstance';
import { addErrorMessage } from '@/features/MessagesBar/messagesBarSlice';
import { AppDispatch } from '@/store/store';

export const catchErrorInAsyncAction = async (
  rejectWithValue: any,
  dispatch: AppDispatch,
  callback: any,
) => {
  try {
    const res = await callback();
    return res;
  } catch (err) {
    const error: AxiosError<KnownError> = err as any;

    if (!error.response) {
      throw err;
    }

    dispatch(
      addErrorMessage({
        detail: error.message,
      }),
    );
    return rejectWithValue(error.response.data);
  }
};
