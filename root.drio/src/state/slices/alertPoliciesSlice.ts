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
      rule_description: "This trigger is to detect if the value is out of range.",
      streams: [
        {
          data_source_id: "kafka",
          dataset_id: "dataset_1",
        },
      ],
      channels: [
        {
          channel: "email",
          message: "Out of range by 40%",
        },
      ],
      threshold_value: "40%",
      trigger: "notify.teams.outlook.com",
      data_source: "SAP Inventory",
      message: "Out of range by 40%",
      occurence_history: "",
    },
    {
      id: "6a0f95a8-8de3-4b63-9137-fe61ebcb1e20",
      rule_template: "PO Delayed Trigger",
      rule_description:
        "This trigger is created if the delivery date detected in a PO is later than delivery date sent previously.",
      streams: [
        {
          data_source_id: "kafka",
          dataset_id: "dataset_1",
        },
      ],
      channels: [
        {
          channel: "email",
          message: "Delayed by 2 days",
        },
      ],
      threshold_value: "56%",
      trigger: "email",
      data_source: "kafka",
      message: "Delayed by 2 days",
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
