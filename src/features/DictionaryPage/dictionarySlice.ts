import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

import axios from '@/api/axiosInstance';
import { ApiRequestStatusV2 } from '@/types/general';
import { RootState, AppDispatch } from '@/store/store';
import { catchErrorInAsyncAction } from '@/store/storeUtils';
import { selectCurrentTargetLanguage } from '@/features/InitProfilePage/userProfileSlice';
import { LearningWordForToday } from '@/types/word';
import { wordApi } from '@/api/queries/wordQueries';

import { generateAdditionalData } from './utils/generateAdditionalData';

export const getLearningWordsForToday = createAsyncThunk(
  'words/learning-words',
  async (_: void, { rejectWithValue, dispatch, getState }) => {
    const targetLang = selectCurrentTargetLanguage(getState() as RootState);

    return catchErrorInAsyncAction(
      rejectWithValue,
      dispatch as AppDispatch,
      async () => {
        const response = await axios.get(
          `/v1/words/learning-words?targetLang=${targetLang}&learnToday=true&practice=true&limit=50&page=0`,
        );
        return response.data;
      },
    );
  },
);

export const getNumberWords = createAsyncThunk(
  'words/counts',
  async (_: void, { rejectWithValue, dispatch, getState }) => {
    const targetLang = selectCurrentTargetLanguage(getState() as RootState);

    return catchErrorInAsyncAction(
      rejectWithValue,
      dispatch as AppDispatch,
      async () => {
        const response = await axios.get(
          `/v1/words/counts?targetLang=${targetLang}`,
        );
        return response.data;
      },
    );
  },
);

interface InitialState {
  learningWordsForToday: LearningWordForToday[];
  numberLearningWordsForToday: number;
  numberLearningWordsSoon: number;
  numberFinishedWords: number;
  limitLearningWordsForToday: number;
  offsetLearningWordsForToday: number;
  status: ApiRequestStatusV2;
  error: any;
}

const initialState: InitialState = {
  learningWordsForToday: [],
  numberLearningWordsForToday: 0,
  numberLearningWordsSoon: 0,
  numberFinishedWords: 0,
  limitLearningWordsForToday: 50,
  offsetLearningWordsForToday: 0,
  status: 'idle',
  error: null,
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
    },
    removeTodayWordById: (state, { payload }: { payload: { id: string } }) => {
      if (state.learningWordsForToday.length) {
        state.learningWordsForToday = state.learningWordsForToday.filter(
          ({ id }) => id !== payload.id,
        );
        state.numberLearningWordsForToday =
          state.numberLearningWordsForToday - 1;
      }
    },
    increaseNumberLearningWordsForToday: (state) => {
      state.numberLearningWordsForToday = state.numberLearningWordsForToday + 1;
    },
    decreaseNumberLearningWordsForToday: (state) => {
      state.numberLearningWordsForToday = state.numberLearningWordsForToday - 1;
    },
    increaseNumberLearningWordsSoon: (state) => {
      state.numberLearningWordsSoon = state.numberLearningWordsSoon + 1;
    },
    decreaseNumberLearningWordsSoon: (state) => {
      state.numberLearningWordsSoon = state.numberLearningWordsSoon - 1;
    },
    increaseNumberFinishedWords: (state) => {
      state.numberFinishedWords = state.numberFinishedWords + 1;
    },
    decreaseNumberFinishedWords: (state) => {
      state.numberFinishedWords = state.numberFinishedWords - 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getLearningWordsForToday.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getLearningWordsForToday.fulfilled, (state, { payload }) => {
        state.learningWordsForToday = generateAdditionalData(payload);
        // state.numberLearningWordsForToday = payload[1];
        state.status = 'succeeded';
      })
      .addCase(getLearningWordsForToday.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getNumberWords.fulfilled, (state, { payload }) => {
        // state.learningWordsForToday = generateAdditionalData(payload[0]);
        state.numberLearningWordsForToday = payload.numberLearningWordsForToday;
        state.numberLearningWordsSoon = payload.numberLearningWordsSoon;
        state.numberFinishedWords = payload.numberFinishedWords;
        state.status = 'succeeded';
      });
  },
});

export const selectDictionary = (state: RootState) => state.dictionary;

export const deleteWord = createAsyncThunk(
  'words/delete',
  async (
    {
      id,
      isFinished,
      isLearnToday,
      isLearnSoon,
    }: {
      id: string;
      isFinished?: boolean;
      isLearnToday?: boolean;
      isLearnSoon?: boolean;
    },
    { rejectWithValue, dispatch },
  ) => {
    return catchErrorInAsyncAction(
      rejectWithValue,
      dispatch as AppDispatch,
      async () => {
        const response = await axios.delete(`/v1/words/delete?id=${id}`);
        if (isFinished) {
          dispatch(dictionarySlice.actions.decreaseNumberFinishedWords());
          dispatch(wordApi.util.invalidateTags(['Finished']));
        }
        if (isLearnToday) {
          dispatch(dictionarySlice.actions.removeTodayWordById({ id }));
        }
        if (isLearnSoon) {
          dispatch(dictionarySlice.actions.decreaseNumberLearningWordsSoon());
          dispatch(wordApi.util.invalidateTags(['LearnSoon']));
        }
        return response.data;
      },
    );
  },
);

export const selectLearningWordsForToday = createSelector(
  selectDictionary,
  (reducerState) => {
    return reducerState.learningWordsForToday;
  },
);

export const selectWordCounts = createSelector(
  selectDictionary,
  ({
    numberLearningWordsForToday,
    numberLearningWordsSoon,
    numberFinishedWords,
  }) => {
    return {
      numberLearningWordsForToday,
      numberLearningWordsSoon,
      numberFinishedWords,
    };
  },
);

export const selectNumberLearningWordsForToday = createSelector(
  selectDictionary,
  (reducerState) => {
    return reducerState.numberLearningWordsForToday;
  },
);

export const {
  removeTodayWordById,
  increaseNumberLearningWordsSoon,
  increaseNumberFinishedWords,
} = dictionarySlice.actions;

export default dictionarySlice.reducer;
