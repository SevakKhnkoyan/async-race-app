import { Action, ThunkAction } from '@reduxjs/toolkit';
import { declareWinner } from './winnersSlice';
import store from '.';

type RootState = ReturnType<typeof store.getState>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const declareWinnerIfEmpty =
  (payload: { id: number; name: string; time: number }): AppThunk =>
  (dispatch, getState) => {
    if (!getState().winners.winner) {
      dispatch(declareWinner(payload));
    }
  };
