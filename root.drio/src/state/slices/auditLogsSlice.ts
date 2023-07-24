import { createSlice } from "@reduxjs/toolkit";

type AuditLogState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: AuditLogState = {
  rows: [
    {
      id: "1",
      timeOfAccess: "11/7/23 12:10:17",
      subscriberOU: "XTime",
      dataset: "Service Record",
      status: "Error",
      accessingEntity: "App1",
      country: "USA",
    },
    {
      id: "2",
      timeOfAccess: "11/7/23 12:10:17",
      subscriberOU: "Dealer Track",
      dataset: "Accidents",
      status: "Success",
      accessingEntity: "App2",
      country: "Armania",
    },
    {
      id: "3",
      timeOfAccess: "11/7/23 12:10:17",
      subscriberOU: "KBB",
      dataset: "Dealer Sales",
      status: "Warning",
      accessingEntity: "App3",
      country: "Sweden",
    },
    {
      id: "4",
      timeOfAccess: "11/7/23 12:10:17",
      subscriberOU: "B Bank",
      dataset: "Customer Sales",
      status: "Error",
      accessingEntity: "App4",
      country: "USA",
    },
  ],
  selectedRows: [],
};

const audlitLogSlice = createSlice({
  name: "auditLogs",
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

export const { setRows, setSelectedRows } = audlitLogSlice.actions;

export default audlitLogSlice.reducer;
