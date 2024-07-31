import { createSlice } from "@reduxjs/toolkit";

type EmailServer = {
  server_port: string;
  server_address: string;
  server_username: string;
  server_password: string;
  server_email_name: string;
  server_email_address: string;
};

type NTPServer = {
  sync_interval: string;
  primary_server_address: string;
  secondary_server_address: string;

  backup_servers: {
    server_number: number;
    server_address: string;
  }[];
};

type ActivationEmailTemplate = {
  subject: string;
  body: string;
};

type WelcomeEmailTemplate = {
  subject: string;
  body: string;
};

type SettingsSlice = {
  ntpServer: NTPServer;
  emailServer: EmailServer;

  emailTemplate: {
    templateType: "welcome" | "activation";
    welcomeEmailTemplate: WelcomeEmailTemplate;
    activationEmailTemplate: ActivationEmailTemplate;
  };
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

  ntpServer: {
    sync_interval: "1",
    primary_server_address: "0.ubuntu.pool.ntp.org",
    secondary_server_address: "2.ubuntu.pool.ntp.org",
    backup_servers: [
      {
        server_number: 1,
        server_address: "3.ubuntu.pool.ntp.org",
      },
    ],
  },

  emailTemplate: {
    welcomeEmailTemplate: {
      subject: "Welcome to A 10Harmony",
      body: "Welcome to A10 Harmony. We are excited to have you on board.",
    },

    activationEmailTemplate: {
      subject: "Activate your account",
      body: "Welcome to A10 Harmony. Please click on the link below to activate your account.",
    },

    templateType: "welcome",
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setEmailServer(state, action) {
      state.emailServer = action.payload;
    },

    setNTPServer(state, action) {
      state.ntpServer = action.payload;
    },

    setActivationEmailTemplate(state, action) {
      state.emailTemplate.activationEmailTemplate = action.payload;
    },

    setWelcomeEmailTemplate(state, action) {
      state.emailTemplate.welcomeEmailTemplate = action.payload;
    },

    setTemplateType(state, action) {
      state.emailTemplate.templateType = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const {
  setNTPServer,
  setEmailServer,
  setTemplateType,
  setWelcomeEmailTemplate,
  setActivationEmailTemplate,
} = settingsSlice.actions;

export default settingsSlice.reducer;
