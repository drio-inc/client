import { createSlice } from "@reduxjs/toolkit";

type NotificationState = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: NotificationState = {
  rows: [
    {
      id: "1",
      name: "Teams",
      channel_type: "webhook",
      url: "notify.teams.outlook.com",
      times_used: 7,
      enabled: "yes",
    },
    {
      id: "2",
      name: "Jira",
      channel_type: "webhook",
      url: "notify.jira.outlook.com",
      times_used: 5,
      enabled: "no",
    },
    {
      id: "3",
      name: "Service Now",
      channel_type: "webhook",
      url: "notify.service-now.outlook.com",
      times_used: 10,
      enabled: "yes",
    },
  ],
  selectedRows: [],
};

const notificationSlice = createSlice({
  name: "notifications",
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

export const { setRows, setSelectedRows } = notificationSlice.actions;

export default notificationSlice.reducer;
