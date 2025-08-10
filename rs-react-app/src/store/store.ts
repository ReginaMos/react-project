import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './favouritesReducer';
import { api } from './peopleApi';

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
