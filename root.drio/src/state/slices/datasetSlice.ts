import { createSlice } from "@reduxjs/toolkit";

type datasetState = {
  rows: TableRow[];
  trigger?: boolean;
  rawRows: TableRow[];
  selectedRows: number[];
  addNewDispatched: boolean;
};

const initialState: datasetState = {
  rows: [],
  rawRows: [],
  trigger: false,
  selectedRows: [],
  addNewDispatched: false,
};

const datasetSlice = createSlice({
  name: "dataset",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setAddNewDispatched(state, action) {
      state.addNewDispatched = action.payload;
    },

    setTrigger(state, action) {
      state.trigger = action.payload;
    },

    setRawRows(state, action) {
      state.rawRows = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const {
  setRows,
  setTrigger,
  setRawRows,
  setSelectedRows,
  setAddNewDispatched,
} = datasetSlice.actions;

export default datasetSlice.reducer;
