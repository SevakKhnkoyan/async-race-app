import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './carsSlice.ts';
import { carsApi } from '../services/carsApi.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
// import winnersReducer from './winnersSlice.ts';

const store = configureStore({
  reducer: {
    [carsApi.reducerPath]: carsApi.reducer,
    cars: carsReducer,
    // winners: winnersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carsApi.middleware),
});

export default store;

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
