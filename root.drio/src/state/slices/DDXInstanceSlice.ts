import { createSlice } from "@reduxjs/toolkit";

type DDXInstanceState = {
  rows: TableRow[];
};

const initialState: DDXInstanceState = {
  rows: [],
};

const DDXInstanceSlice = createSlice({
  name: "DDXInstance",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows } = DDXInstanceSlice.actions;

export default DDXInstanceSlice.reducer;
