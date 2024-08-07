import { createSlice } from "@reduxjs/toolkit";

type AnomalyRuleState = {
  rows: AnomalyRule[];
  selectedRows: string[];
};

const initialState: AnomalyRuleState = {
  rows: [
    {
      id: "1",
      active: true,
      anomaly_type: "IQR anomalies for attributes of a dataset",
      sensitivity: 45,
      trigger: "Teams",
    },
    {
      id: "2",
      active: true,
      anomaly_type: "Cluster anomalies for attributes of a dataset",
      sensitivity: 67,
      trigger: "Jira",
    },
    {
      id: "3",
      active: false,
      anomaly_type: "Type mismatch anomalies for a dataset",
      sensitivity: 89,
      trigger: "Service Now",
    },
  ],
  selectedRows: [],
};

const anomalyRuleSlice = createSlice({
  name: "anomalyRule",
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

export const { setRows, setSelectedRows } = anomalyRuleSlice.actions;

export default anomalyRuleSlice.reducer;
