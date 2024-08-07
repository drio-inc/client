import contractRules from "../../data/contract_rules.json";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Rule = {
  id?: string;
  name?: string;
  action?: string;
  dataset?: string;
  defaultAllow?: boolean;
  subrules?: {
    id?: string;
    value: string;
    subrule: string;
    metadata: string;
    conditions: string;
  }[];
} | null;

type ContractRuleState = {
  rows: TableRow[];
  ruleRows: Rule[];
  selectedRows: number[];
};

const initialState: ContractRuleState = {
  ruleRows: [],
  selectedRows: [],
  rows: contractRules,
};

const contractRuleSlice = createSlice({
  name: "contractRule",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setRuleRows(state, action: PayloadAction<Rule[]>) {
      state.ruleRows = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setRuleRows } = contractRuleSlice.actions;

export default contractRuleSlice.reducer;
