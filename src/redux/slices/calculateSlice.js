import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstItem: 0,
  secondItem: 0,
  result: 0,
};

export const calculateSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setFirstItem: (state, action) => {
      state.firstItem = action.payload;
    },
    setSecondItem: (state, action) => {
      state.secondItem = action.payload;
    },
    addNumbers: (state) => {
      state.result = state.firstItem + state.secondItem;
    },
    subtractNumbers: (state) => {
      state.result = state.firstItem - state.secondItem;
    },
  },
});

export const { setFirstItem, setSecondItem, addNumbers, subtractNumbers } = calculateSlice.actions;

export default calculateSlice.reducer;
