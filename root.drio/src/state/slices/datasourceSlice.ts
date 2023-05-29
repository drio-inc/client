import { createSlice } from "@reduxjs/toolkit";

type datasourceState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: datasourceState = {
  rows: [],
  selectedRows: [],
};

const datasourceSlice = createSlice({
  name: "dataset",
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

export const { setRows, setSelectedRows } = datasourceSlice.actions;

export default datasourceSlice.reducer;
