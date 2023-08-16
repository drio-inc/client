import { createSlice } from "@reduxjs/toolkit";

type OrgUnitState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: OrgUnitState = {
  rows: [],
  selectedRows: [],
};

const orgUnitSlice = createSlice({
  name: "orgUnit",
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

export const { setRows, setSelectedRows } = orgUnitSlice.actions;

export default orgUnitSlice.reducer;
