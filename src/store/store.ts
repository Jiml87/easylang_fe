import { configureStore } from '@reduxjs/toolkit';
import newPhrase from '@/features/AddWordPage/addWordSlice';
import messages from '@/features/MessagesBar/messagesBarSlice';
import loginState from '@/features/LoginPage/loginSlice';
import userProfile from '@/features/InitProfilePage/userProfileSlice';
import dictionary from '@/features/DictionaryPage/dictionarySlice';
import learning from '@/features/LearningPage/learningSlice';
import { wordApi } from '@/api/queries/wordQueries';

export const makeStore = () => {
  return configureStore({
    reducer: {
      newPhrase,
      messages,
      loginState,
      userProfile,
      dictionary,
      learning,
      [wordApi.reducerPath]: wordApi.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(wordApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export type CreateAsyncThunkOptions = {
  dispatch: AppDispatch;
  state: RootState;
};
