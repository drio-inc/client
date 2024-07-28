import { createSlice } from "@reduxjs/toolkit";

type EmailServer = {
  server_port: string;
  server_address: string;
  server_username: string;
  server_password: string;
  server_email_name: string;
  server_email_address: string;
};

type SettingsSlice = {
  emailServer: EmailServer;
};

const initialState: SettingsSlice = {
  emailServer: {
    server_port: "587",
    server_username: "ubuntu",
    server_address: "10.23.42.34",
    server_password: "**********",
    server_email_name: "A 10Harmony",
    server_email_address: "saas@ainetwork.com",
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setEmailServer(state, action) {
      state.emailServer = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setEmailServer } = settingsSlice.actions;

export default settingsSlice.reducer;
