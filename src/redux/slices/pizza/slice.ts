import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchPizzasParams, Pizza, PizzaSliceState, Status } from './types';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasParams, thunkAPI) => {
    const { category, search, sortType, currentPage } = params;
    const { data } = await axios.get(
      `https://683352f0464b499636ff1495.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}${search}`,
    );
    return data as Pizza[];
  },
);


const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload; // Обязательное явное обозночение   синтаксис в ролике устарел читай документацию если забудешь https://redux-toolkit.js.org/api/createSlice
      state.status = Status.SUCCSES;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});



export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
