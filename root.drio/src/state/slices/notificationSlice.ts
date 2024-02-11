import { createSlice } from "@reduxjs/toolkit";
import { Anomalies } from "@/api/resources/anomalies/types";

export type AnomalyNotification = {
  id: string;
  ou: string;
  ds: string;
  iqr: number;
  name: string;
  field: string;
  timestamp: number;
  anomalies: Anomalies[];
  data_source_id: string;
  value: string | number | boolean;
  anomaly_type: "comparison" | "iqr";
  datatype: string | number | boolean;
  new_datatype: string | number | boolean;
  event_type:
    | "anomaly"
    | "added_new_field"
    | "Cluster Anomaly"
    | "datatype_mismatch";
};

type NotificationSlice = {
  isRead: boolean;
  notifications: AnomalyNotification[];
};

const initialState: NotificationSlice = {
  notifications: [],
  isRead: false,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },

    readNotifications(state, action) {
      state.isRead = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setNotifications, readNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
