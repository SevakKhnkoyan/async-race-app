import { createListenerMiddleware } from '@reduxjs/toolkit';
import { declareWinner } from './winnersSlice';
import { winnersApi } from '../services/winnersApi';

export const listeners = createListenerMiddleware();

listeners.startListening({
  actionCreator: declareWinner,
  effect: async (action, api) => {
    const { id, name, time } = action.payload;
    const { dispatch } = api;
    try {
      await dispatch(
        winnersApi.endpoints.createWinner.initiate({ id, name, wins: 1, time }),
      ).unwrap();
    } catch {
      // duplicate -> update
      const existing = await dispatch(winnersApi.endpoints.getWinner.initiate(id)).unwrap();
      const newWins = (existing?.wins ?? 0) + 1;
      const bestTime = Math.min(existing?.time ?? time, time);
      await dispatch(
        winnersApi.endpoints.updateWinner.initiate({ id, name, wins: newWins, time: bestTime }),
      ).unwrap();
    }
  },
});
