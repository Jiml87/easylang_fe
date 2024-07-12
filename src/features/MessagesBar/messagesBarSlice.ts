import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessagesMessage } from 'primereact/messages';

import { RootState } from '@/store/store';

interface InitialState {
  messages: MessagesMessage[];
}

const initialState: InitialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessagesMessage>) => {
      state.messages.push(action.payload);
    },
    addSuccessMessage: (state, action: PayloadAction<MessagesMessage>) => {
      state.messages.push({
        severity: 'success',
        detail: action.payload.detail,
      });
    },
    addErrorMessage: (state, action: PayloadAction<MessagesMessage>) => {
      state.messages.push({
        severity: 'error',
        detail: action.payload.detail,
      });
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, clearMessages, addSuccessMessage, addErrorMessage } =
  messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages.messages;

export default messagesSlice.reducer;
