import { createSlice } from "@reduxjs/toolkit";

type AccountState = {
  rows: TableRow[];
  accountId: string;
  selectedRows: number[];
};

const initialState: AccountState = {
  rows: [],
  accountId: "",
  selectedRows: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setAccountId(state, action) {
      state.accountId = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setAccountId } = accountSlice.actions;

export default accountSlice.reducer;
