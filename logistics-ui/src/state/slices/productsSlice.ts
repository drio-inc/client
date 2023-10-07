import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductsState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: ProductsState = {
  rows: [],
  selectedRows: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows } = productsSlice.actions;

export default productsSlice.reducer;
