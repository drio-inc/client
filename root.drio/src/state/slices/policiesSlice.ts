import { createSlice } from "@reduxjs/toolkit";

type PolicyState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: PolicyState = {
  rows: [],
  selectedRows: [],
};

const policiesSlice = createSlice({
  name: "policy",
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

export const { setRows, setSelectedRows } = policiesSlice.actions;

export default policiesSlice.reducer;
