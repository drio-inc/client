import { createSlice } from "@reduxjs/toolkit";

type AnomalyPolicyState = {
  rows: AnomalyPolicy[];
  selectedRows: string[];
};

const initialState: AnomalyPolicyState = {
  rows: [
    {
      id: "1",
      active: true,
      anomaly_type: "IQR anomalies for attributes of a dataset",
      sensitivity: 45,
      notification: "Teams",
    },
    {
      id: "2",
      active: true,
      anomaly_type: "Cluster anomalies for attributes of a dataset",
      sensitivity: 67,
      notification: "Jira",
    },
    {
      id: "3",
      active: false,
      anomaly_type: "Type mismatch anomalies for a dataset",
      sensitivity: 89,
      notification: "Service Now",
    },
  ],
  selectedRows: [],
};

const anomalyPoliciesSlice = createSlice({
  name: "anomalyPolicies",
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

export const { setRows, setSelectedRows } = anomalyPoliciesSlice.actions;

export default anomalyPoliciesSlice.reducer;
