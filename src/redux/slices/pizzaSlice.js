import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { category, search, sortType, currentPage } = params;
  const { data } = await axios.get(
    `https://683352f0464b499636ff1495.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload; // Обязательное явное обозночение   синтаксис в ролике устарел читай документацию если забудешь https://redux-toolkit.js.org/api/createSlice
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
