import { createSlice } from "@reduxjs/toolkit";

type AccountState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: AccountState = {
  rows: [],
  selectedRows: [],
};

const accountSlice = createSlice({
  name: "account",
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

export const { setRows, setSelectedRows } = accountSlice.actions;

export default accountSlice.reducer;
