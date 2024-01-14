import { createSlice } from "@reduxjs/toolkit";

type AlertAnomalyPolicyState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: AlertAnomalyPolicyState = {
  rows: [
    {
      id: "1",
      alertRule: "Range Anomaly",
      trigger: "Range",
      dataResource: "SAP Inventory",
      thresholdValue: "40%",
      message: "Out of range by 40%",
      occurenceHistory: "",
    },
  ],
  selectedRows: [],
};

const alertAnomalyPoliciesState = createSlice({
  name: "alertsAnomalyPolicies",
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

export const { setRows, setSelectedRows } = alertAnomalyPoliciesState.actions;

export default alertAnomalyPoliciesState.reducer;
