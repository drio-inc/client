import { createSlice } from "@reduxjs/toolkit";

type AdminAccountState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: AdminAccountState = {
  rows: [],
  selectedRows: [],
};

const adminAccountSlice = createSlice({
  name: "adminAccount",
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

export const { setRows, setSelectedRows } = adminAccountSlice.actions;

export default adminAccountSlice.reducer;
