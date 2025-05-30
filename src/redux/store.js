import { configureStore } from '@reduxjs/toolkit';
import calculateReducer from './slices/calculateSlice';

export const store = configureStore({
  reducer: {
    calculate: calculateReducer,
  },
});
