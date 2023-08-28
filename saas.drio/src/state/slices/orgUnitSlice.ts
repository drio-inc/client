import { createSlice } from "@reduxjs/toolkit";

type OrgUnitState = {
  rows: TableRow[];
  row: TableRow | null;
  selectedRows: number[];
};

const initialState: OrgUnitState = {
  row: null,
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

    setRow(state, action) {
      state.row = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setRow } = orgUnitSlice.actions;

export default orgUnitSlice.reducer;
