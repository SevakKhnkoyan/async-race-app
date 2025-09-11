import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RaceState, WinnerInfo } from '../types';

const initialState: RaceState = { winner: null, page: 1 };

const raceSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    declareWinner(state, action: PayloadAction<WinnerInfo>) {
      // only the first finisher wins
      if (!state.winner) state.winner = action.payload;
    },
    resetWinner(state) {
      if (state.winner) state.winner = null;
    },
    goToPageWinners(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { declareWinner, resetWinner, goToPageWinners } = raceSlice.actions;
export default raceSlice.reducer;
