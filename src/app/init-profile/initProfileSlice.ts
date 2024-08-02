import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '@/api/axiosInstance';
import { RootState } from '@/store/store';
import { catchErrorInAsyncAction } from '@/store/storeUtils';
import { AppDispatch } from '@/store/store';
import { AvailableLangs } from '@/types/langs';

type ProfileBody = {
  firstName: string;
  nativeLang: AvailableLangs;
  targetLang: AvailableLangs;
};

export const initProfileRequest = createAsyncThunk(
  'initProfileRequest',
  async (body: ProfileBody, { rejectWithValue, dispatch }) => {
    return catchErrorInAsyncAction(
      rejectWithValue,
      dispatch as AppDispatch,
      async () => {
        const response = await axios.post('/v1/users/setup-profile', body);
        return response.data;
      },
    );
  },
);

interface InitialState {
  isLoading: boolean;
  error: any;
}

const initialState: InitialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'initProfile',
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers(builder) {
    builder
      .addCase(initProfileRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initProfileRequest.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(initProfileRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectInitProfileState = (state: RootState) => state.initProfile;

export default slice.reducer;
