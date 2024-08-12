import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '@/api/axiosInstance';
import { RootState } from '@/store/store';
import { catchErrorInAsyncAction } from '@/store/storeUtils';
import { AppDispatch } from '@/store/store';
import { AvailableLangs } from '@/types/langs';
import { UserProfile } from '@/types/auth';

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
  userProfile: null | UserProfile;
  isAuth: boolean;
  isLoading: boolean;
  error: any;
}

const initialState: InitialState = {
  userProfile: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'initProfile',
  initialState,
  reducers: {
    initProfileInfo: (state, { payload }) => {
      state.userProfile = payload;
      state.isAuth = true;
    },
    resetAuthState: (state) => {
      state.userProfile = initialState.userProfile;
      state.isAuth = initialState.isAuth;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initProfileRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initProfileRequest.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userProfile = payload;
        state.isAuth = true;
      })
      .addCase(initProfileRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectInitProfileState = (state: RootState) => state.initProfile;
export const { initProfileInfo } = slice.actions;

export default slice.reducer;
