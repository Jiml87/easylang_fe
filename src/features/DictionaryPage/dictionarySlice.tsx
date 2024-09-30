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

import { generateAdditionalData } from './utils/generateAdditionalData';

interface InitialState {
  learningWordsForToday: LearningWordForToday[];
  countLearningWordsForToday: number;
  limitLearningWordsForToday: number;
  offsetLearningWordsForToday: number;
  status: ApiRequestStatusV2;
  error: any;
}

const initialState: InitialState = {
  learningWordsForToday: [],
  countLearningWordsForToday: 0,
  limitLearningWordsForToday: 50,
  offsetLearningWordsForToday: 0,
  status: 'idle',
  error: null,
};

export const getLearningWordsForToday = createAsyncThunk(
  'word/learning',
  async (_: void, { rejectWithValue, dispatch, getState }) => {
    const targetLang = selectCurrentTargetLanguage(getState() as RootState);

    return catchErrorInAsyncAction(
      rejectWithValue,
      dispatch as AppDispatch,
      async () => {
        const response = await axios.get(
          `/v1/words/learning-words?targetLang=${targetLang}&learnToday=true&sentences=true&limit=50`,
        );
        return response.data;
      },
    );
  },
);

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getLearningWordsForToday.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getLearningWordsForToday.fulfilled, (state, { payload }) => {
        state.learningWordsForToday = generateAdditionalData(payload[0]);
        state.countLearningWordsForToday = payload[1];
        state.status = 'succeeded';
      })
      .addCase(getLearningWordsForToday.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectDictionary = (state: RootState) => state.dictionary;

export const selectLearningWordsForToday = createSelector(
  selectDictionary,
  (reducerState) => {
    return reducerState.learningWordsForToday;
  },
);

export const selectCountLearningWordsForToday = createSelector(
  selectDictionary,
  (reducerState) => {
    return reducerState.countLearningWordsForToday;
  },
);

export default dictionarySlice.reducer;
