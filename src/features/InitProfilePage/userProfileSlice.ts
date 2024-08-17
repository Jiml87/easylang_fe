import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

import axios from '@/api/axiosInstance';
import { RootState } from '@/store/store';
import { catchErrorInAsyncAction } from '@/store/storeUtils';
import { CreateAsyncThunkOptions } from '@/store/store';
import { AvailableLangs } from '@/types/langs';
import { UserProfile } from '@/types/auth';

export type ProfileBody = {
  firstName: string;
  nativeLang: AvailableLangs;
  targetLang: AvailableLangs;
};

export const initProfileRequest = createAsyncThunk<
  UserProfile,
  ProfileBody,
  CreateAsyncThunkOptions
>('initProfileRequest', async (body, { rejectWithValue, dispatch }) => {
  return catchErrorInAsyncAction(rejectWithValue, dispatch, async () => {
    const response = await axios.post('/v1/users/setup-profile', body);
    return response.data;
  });
});

interface InitialState {
  user: UserProfile | null;
  currentTargetLang: AvailableLangs | null;
  isAuth: boolean;
  isLoading: boolean;
  error: any;
}

const initialState: InitialState = {
  user: null,
  currentTargetLang: null,
  isAuth: false,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    userProfileInfo: (state, { payload }) => {
      state.user = payload;
      state.isAuth = true;
    },
    resetAuthState: (state) => {
      state.user = initialState.user;
      state.currentTargetLang = initialState.currentTargetLang;
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
        state.user = payload;
        state.currentTargetLang =
          payload.targetLangs?.find(({ isPrimary }) => isPrimary)?.lang || null;
        state.isAuth = true;
      })
      .addCase(initProfileRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectUserProfileState = (state: RootState) => state.userProfile;

export const selectUserProfile = createSelector(
  selectUserProfileState,
  (userProfile) => userProfile.user,
);

export const selectNativeLanguage = createSelector(
  selectUserProfile,
  (user: UserProfile | null): AvailableLangs | null => {
    const lang = user?.nativeLang;
    if (!lang) {
      return null;
    }
    return lang;
  },
);

export const selectCurrentTargetLanguage = (state: RootState) =>
  state.userProfile.currentTargetLang;

export const { userProfileInfo } = slice.actions;

export default slice.reducer;
