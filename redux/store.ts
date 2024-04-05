import { configureStore } from '@reduxjs/toolkit';
import currentflashcardReducer from './currentflashcardSlice';
import flashcardReducer from '@/redux/flashcardSlice';
export const store = configureStore({
  reducer: {
    currentflashcard: currentflashcardReducer,
    flashcards: flashcardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
