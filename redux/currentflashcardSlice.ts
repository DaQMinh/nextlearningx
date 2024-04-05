// flashcardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface FlashcardState {
  front: string;
  back: string;
}

const initialState: FlashcardState = {
  front: '',
  back: '',
};

export const currentflashcardSlice = createSlice({
  name: 'currentflashcard',
  initialState,
  reducers: {
    setFlashcard: (state, action: PayloadAction<FlashcardState>) => {
      state.front = action.payload.front;
      state.back = action.payload.back;
    }
  },
});

export const { setFlashcard } = currentflashcardSlice.actions;

export const selectFront = (state: RootState) => state.currentflashcard.front;
export const selectBack = (state: RootState) => state.currentflashcard.back;

export default currentflashcardSlice.reducer;
