import { createSlice } from "@reduxjs/toolkit";

type PolicyState = {
  rows: TableRow[];
  selectedRows: number[];

  ruleRows: TableRow[];
  selectedRuleRows: number[];
};

const initialState: PolicyState = {
  rows: [],
  selectedRows: [],

  ruleRows: [],
  selectedRuleRows: [],
};

const policiesSlice = createSlice({
  name: "policies",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setRuleRows(state, action) {
      state.ruleRows = action.payload;
    },

    setSelectedRuleRows(state, action) {
      state.selectedRuleRows = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setRuleRows, setSelectedRuleRows } =
  policiesSlice.actions;

export default policiesSlice.reducer;
