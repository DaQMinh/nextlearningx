import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlashcardState {
  front: string;
  back: string;
}

export interface FlashcardsState {
  flashcards: FlashcardState[];
}

const initialState: FlashcardsState = {
  flashcards: [],
};

const flashcardsSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
    addFlashcards(state, action: PayloadAction<FlashcardState[]>) {
      state.flashcards.push(...action.payload);
    },
    removeFlashcard(state, action: PayloadAction<FlashcardState>) {
        state.flashcards = state.flashcards.filter(
          card => action.payload && card.front !== action.payload.front && card.back !== action.payload.back
        );
      },
      
  },
});

export const { addFlashcards, removeFlashcard } = flashcardsSlice.actions;
export default flashcardsSlice.reducer;
