import { createSlice } from "@reduxjs/toolkit";

type dataSourceState = {
  rows: DataSource[];
  selectedRows: number[];
  defaultSource: TableRow | null;
};

const initialState: dataSourceState = {
  rows: [],
  selectedRows: [],
  defaultSource: null,
};

const dataSourceSlice = createSlice({
  name: "dataSource",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setDefaultSource(state, action) {
      state.defaultSource = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setDefaultSource } =
  dataSourceSlice.actions;

export default dataSourceSlice.reducer;
