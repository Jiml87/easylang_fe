import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

import axios from '@/api/axiosInstance';
import { ApiRequestStatusV2 } from '@/types/general';
import { RootState, AppDispatch } from '@/store/store';
import { catchErrorInAsyncAction } from '@/store/storeUtils';
import { WordLearningDay } from '@/types/word';
import {
  removeTodayWordById,
  increaseNumberLearningWordsSoon,
  increaseNumberFinishedWords,
} from '@/features/DictionaryPage/dictionarySlice';
import { wordApi } from '@/api/queries/wordQueries';

interface InitialState {
  status: ApiRequestStatusV2;
  error: any;
}

const initialState: InitialState = {
  status: 'idle',
  error: null,
};

export const learnWordForToday = createAsyncThunk(
  'word/learn',
  async (
    { id, prevDay }: { id: string; prevDay: WordLearningDay },
    { rejectWithValue, dispatch },
  ) => {
    return catchErrorInAsyncAction(
      rejectWithValue,
      dispatch as AppDispatch,
      async () => {
        const response = await axios.patch(`/v1/words/learn-word`, {
          id,
          prevDay,
        });

        dispatch(removeTodayWordById({ id }));
        // last learning day
        if (prevDay === 7) {
          dispatch(increaseNumberFinishedWords());
          dispatch(wordApi.util.invalidateTags(['Finished']));
        } else {
          dispatch(increaseNumberLearningWordsSoon());
          dispatch(wordApi.util.invalidateTags(['LearnSoon']));
        }

        return response.data;
      },
    );
  },
);

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(learnWordForToday.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(learnWordForToday.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(learnWordForToday.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectLearningState = (state: RootState) => state.learning;

export const selectLearningWordStatus = createSelector(
  selectLearningState,
  (reducerState) => {
    return reducerState.status;
  },
);

export default learningSlice.reducer;
