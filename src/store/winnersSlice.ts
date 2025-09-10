import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RaceState, WinnerInfo } from '../types';

const initialState: RaceState = { winner: null };

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
  },
});

export const { declareWinner, resetWinner } = raceSlice.actions;
export default raceSlice.reducer;
