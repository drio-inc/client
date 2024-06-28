import { createSlice } from "@reduxjs/toolkit";

type AlertPolicyState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: AlertPolicyState = {
  rows: [
    {
      id: "1",
      rule_template: "Range Anomaly",
      data_source: "SAP Inventory",
      threshold_value: "40%",
      message: "Out of range by 40%",
      notification: "Webhook: notify.teams.outlook.com",
      occurence_history: "",
    },
  ],
  selectedRows: [],
};

const alertPoliciesState = createSlice({
  name: "alertPolicies",
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

export const { setRows, setSelectedRows } = alertPoliciesState.actions;

export default alertPoliciesState.reducer;
