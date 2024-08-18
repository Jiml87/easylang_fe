import { configureStore } from '@reduxjs/toolkit';
import newPhrase from '@/features/AddWordPage/addWordSlice';
import messages from '@/features/MessagesBar/messagesBarSlice';
import loginState from '@/features/LoginPage/loginSlice';
import userProfile from '@/features/InitProfilePage/userProfileSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      newPhrase,
      messages,
      loginState,
      userProfile,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export type CreateAsyncThunkOptions = {
  dispatch: AppDispatch;
  state: RootState;
};
