import { createSlice } from "@reduxjs/toolkit";

type AnomalyPolicyState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: AnomalyPolicyState = {
  rows: [
    {
      id: "1",
      anomaly_type: "IQR anomalies for attributes of a dataset",
      sensitivity: "10",
      notification: "Teams",
    },
    {
      id: "2",
      anomaly_type: "Cluster anomalies for attributes of a dataset",
      sensitivity: "10",
      notification: "Jira",
    },
    {
      id: "3",
      anomaly_type: "Type mismatch anomalies for a dataset",
      sensitivity: "10",
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
