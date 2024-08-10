import { createSlice } from "@reduxjs/toolkit";

type LearnedContractSlice = {
  rows: TableRow[];
  rawRows: TableRow[];
  selectedRows: number[];
  currentRow: TableRow | null;
};

const initialState: LearnedContractSlice = {
  rows: [],
  rawRows: [],
  selectedRows: [],
  currentRow: null,
};

const learnedContractSlice = createSlice({
  name: "learnedContract",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setRawRows(state, action) {
      state.rawRows = action.payload;
    },

    setCurrentRow(state, action) {
      state.currentRow = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setRawRows, setCurrentRow } = learnedContractSlice.actions;

export default learnedContractSlice.reducer;
