import { createSlice } from "@reduxjs/toolkit";

type RuleTemplateSlice = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: RuleTemplateSlice = {
  rows: [
    {
      id: "1",
      rule_name: "Avg Threshold",
      rule_description: "Basic single variable moving average",
      times_queried: 21,
      times_used: 7,
      number_of_streams: 1,
      number_of_fields: 1,
      enabled: "yes",
    },
    {
      id: "2",
      rule_name: "Max Threshold",
      rule_description: "Basic but looking only at max over a sliding window",
      times_queried: 13,
      times_used: 4,
      number_of_streams: 1,
      number_of_fields: 1,
      enabled: "no",
    },
    {
      id: "3",
      rule_name: "Spike Detector",
      rule_description: "Small range stat vs long range stat",
      times_queried: 2,
      times_used: 2,
      number_of_streams: 2,
      number_of_fields: 1,
      enabled: "yes",
    },
  ],
  selectedRows: [],
};

const ruleTemplateSlice = createSlice({
  name: "ruleTemplate",
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

export const { setRows, setSelectedRows } = ruleTemplateSlice.actions;

export default ruleTemplateSlice.reducer;
