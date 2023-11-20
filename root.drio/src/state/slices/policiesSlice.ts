import { createSlice } from "@reduxjs/toolkit";

type Rule = {
  id: string;
  name: string;
  dataset: string;
  defaultAllow: boolean;
  subrules: {
    id: string;
    value: string;
    subrule: string;
    metadata: string;
    conditions: string;
  }[];
};

type PolicyState = {
  rows: TableRow[];
  ruleRows: Rule[];
  selectedRows: number[];
};

const initialState: PolicyState = {
  rows: [],
  ruleRows: [],
  selectedRows: [],
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
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setRuleRows } = policiesSlice.actions;

export default policiesSlice.reducer;
