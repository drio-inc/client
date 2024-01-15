import { createSlice } from "@reduxjs/toolkit";

type AnomalyState = {
  rows: TableRow[];
  rawRows: TableRow[];
  row: TableRow | null;
  selectedRows: number[];
};

const initialState: AnomalyState = {
  rows: [],
  row: null,
  rawRows: [],
  selectedRows: [],
};

const anomalySlice = createSlice({
  name: "anomaly",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setRow(state, action) {
      state.row = action.payload;
    },

    setRawRows(state, action) {
      state.rawRows = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setRow, setRawRows } =
  anomalySlice.actions;

export default anomalySlice.reducer;
