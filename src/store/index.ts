import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './garageSlice.ts';
import { carsApi } from '../services/carsApi.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import winnersReducer from './winnersSlice.ts';
import { winnersApi } from '../services/winnersApi.ts';

const store = configureStore({
  reducer: {
    [carsApi.reducerPath]: carsApi.reducer,
    [winnersApi.reducerPath]: winnersApi.reducer,
    garage: garageReducer,
    winners: winnersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carsApi.middleware, winnersApi.middleware),
  devTools: import.meta.env.NODE_ENV !== 'production',
});

export default store;

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
