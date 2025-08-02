import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ItemModel, ItemsContextType } from '../models/models';

const initialState: ItemsContextType = {
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ItemModel>) {
      state.items.push(action.payload);
    },
    removeItemById(state, action: PayloadAction<number>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItemById, clearFavorites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
