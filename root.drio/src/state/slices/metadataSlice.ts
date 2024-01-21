import metadata from "@/data/metadata.json";
import { createSlice } from "@reduxjs/toolkit";

type MetadataSlice = {
  rows: TableRow[];
  rawRows: TableRow[];
  selectedRows: number[];
  currentRow: TableRow | null;
};

const initialState: MetadataSlice = {
  rows: [],
  rawRows: [],
  selectedRows: [],
  currentRow: null,
};

const metadatSlice = createSlice({
  name: "metadata",
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

export const { setRows, setSelectedRows, setRawRows, setCurrentRow } =
  metadatSlice.actions;

export default metadatSlice.reducer;
