import { configureStore } from '@reduxjs/toolkit';
import newPhrase from '@/app/add-phrase/addPhraseSlice';
import messages from '@/features/MessagesBar/messagesBarSlice';
import loginState from '@/app/login/loginSlice';
import initProfile from '@/app/init-profile/initProfileSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      newPhrase,
      messages,
      loginState,
      initProfile,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
