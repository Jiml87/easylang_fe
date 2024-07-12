import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '@/queries/axiosInstance';
import { ApiRequestStatus } from '@/types/general';
import { RootState } from '@/store/store';
import { addSuccessMessage } from '@/features/MessagesBar/messagesBarSlice';
import { catchErrorInAsyncAction } from '@/store/storeUtils';
import { AppDispatch } from '@/store/store';

type CreatePhraseBody = {
  nativePhrase: string;
  translatedPhrase: string;
};

export const createPhrase = createAsyncThunk(
  'prase/create',
  async (body: CreatePhraseBody, { rejectWithValue, dispatch }) => {
    return catchErrorInAsyncAction(
      rejectWithValue,
      dispatch as AppDispatch,
      async () => {
        const response = await axios.post('/v1/words', body);
        dispatch(
          addSuccessMessage({
            detail: 'The phrase is saved',
          }),
        );
        return response.data;
      },
    );
  },
);

interface InitialState {
  status: ApiRequestStatus;
  error: any;
}

const initialState: InitialState = {
  status: 'none',
  error: null,
};

const newPhraseSlice = createSlice({
  name: 'newPhrase',
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers(builder) {
    builder
      .addCase(createPhrase.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPhrase.fulfilled, (state) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
      })
      .addCase(createPhrase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectNewPhrase = (state: RootState) => state.newPhrase;

export default newPhraseSlice.reducer;
