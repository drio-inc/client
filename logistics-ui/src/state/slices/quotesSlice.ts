import { quotesApi } from "@/api/quotes";
import quotes from "@data/quotes.json";
import { createSlice } from "@reduxjs/toolkit";

type QuotesState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: QuotesState = {
  rows: quotes,
  selectedRows: [],
};

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      quotesApi.endpoints.getQuotes.matchFulfilled,
      (state, action) => {
        state.rows = action.payload;
      }
    );
  },
});

export const { setRows, setSelectedRows } = quotesSlice.actions;

export default quotesSlice.reducer;
