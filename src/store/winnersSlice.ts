import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RaceState, WinnerInfo } from '../types';

const initialState: RaceState = { winner: null, page: 1, isWinnerBannerOpen: false };

const raceSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    declareWinner(state, action: PayloadAction<WinnerInfo>) {
      // only the first finisher wins
      if (!state.winner) {
        state.winner = action.payload;
        state.isWinnerBannerOpen = true;
      }
    },
    resetWinner(state) {
      if (state.winner) state.winner = null;
    },
    setIsWinnerBannerOpen(state, action) {
      state.isWinnerBannerOpen = action.payload;
    },
    goToPageWinners(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { declareWinner, resetWinner, setIsWinnerBannerOpen, goToPageWinners } =
  raceSlice.actions;
export default raceSlice.reducer;
