import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '@/api/axiosInstance';
import { RootState } from '@/store/store';
// import { addSuccessMessage } from '@/features/MessagesBar/messagesBarSlice';
import { catchErrorInAsyncAction } from '@/store/storeUtils';
import { AppDispatch } from '@/store/store';
// import { GoogleCredentialResponse } from '@react-oauth/google';

// type LoginBody = {
//   token: string;
// };

export const googleLoginRequest = createAsyncThunk(
  'login/google',
  async (body: { code: string }, { rejectWithValue, dispatch }) => {
    return catchErrorInAsyncAction(
      rejectWithValue,
      dispatch as AppDispatch,
      async () => {
        const response = await axios.get(
          `/v1/auth/google/login?access_token=${body.code}`,
        );
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

const loginSlice = createSlice({
  name: 'loginPageState',
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers(builder) {
    builder
      .addCase(googleLoginRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleLoginRequest.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(googleLoginRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectLoginState = (state: RootState) => state.loginState;

export default loginSlice.reducer;
