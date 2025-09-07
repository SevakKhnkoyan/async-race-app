import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Car, CarsState } from '../types';

const initialState: CarsState = {
  cars: [],
  totalCount: 0,
  page: 1,
  selectedCarId: null,
  status: 'idle'
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    selectCarForEditing(state, action: PayloadAction<Car>) {
      state.selectedCarId = action.payload.id;
    },
    goToPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { selectCarForEditing, goToPage } = carsSlice.actions;
export default carsSlice.reducer;
