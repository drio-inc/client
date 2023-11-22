import metadata from "@/data/metadata.json";
import { createSlice } from "@reduxjs/toolkit";

type MetadatSlice = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: MetadatSlice = {
  rows: metadata,
  selectedRows: [],
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
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows } = metadatSlice.actions;

export default metadatSlice.reducer;
