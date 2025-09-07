import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GarageState } from '../types';

const initialState: GarageState = {
  page: 1,
  selectedCarId: null,
  color: '',
  name: '',
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    selectCarForEditing(state, action: PayloadAction<number>) {
      state.selectedCarId = action.payload;
    },
    selectColor(state, action: PayloadAction<string>) {
      state.color = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    goToPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setName, selectColor, selectCarForEditing, goToPage } = garageSlice.actions;
export default garageSlice.reducer;
