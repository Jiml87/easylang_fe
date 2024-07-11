import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios, { KnownError } from '@/queries/axiosInstance';
import { ApiRequestStatus } from '@/types/general';
import { RootState } from '@/store/store';

type CreatePhraseBody = {
  nativePhrase: string;
  translatedPhrase: string;
};

export const createPhrase = createAsyncThunk(
  'prase/create',
  async (body: CreatePhraseBody, { rejectWithValue }) => {
    try {
      const response = await axios.post('/v1/words', body);
      return response.data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;

      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
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
  name: 'posts',
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
