import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type QuotesState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: QuotesState = {
  rows: [],
  selectedRows: [],
};

const quotesSlice = createSlice({
  name: "quotes",
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

export const { setRows, setSelectedRows } = quotesSlice.actions;

export default quotesSlice.reducer;
