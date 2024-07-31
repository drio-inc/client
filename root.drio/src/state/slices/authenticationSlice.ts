import { createSlice } from "@reduxjs/toolkit";

export type AuthenticationData = {
  authenticationType: "ldap" | "oauth" | "google" | null;

  ldap: {
    cn: string;
    dn: string;
    type: string;
    port: number;
    retries: number;
    dn_string: string;
    dn_pattern: string;
    host_address: string;
    ldap_version: string;
    group_base_dn: string;
    last_name_attribute: string;
    first_name_attribute: string;
    group_object_classes: string;
    group_membership_attribute: string;
  } | null;

  oauth: {
    oauth_url: string;
    oauth_key: string;
    oauth_name: string;
    oauth_secret: string;
    accounting_port: string;
  } | null;

  google: {
    google_client_id: string;
    google_client_email: string;
  } | null;
};

type AuthenticationState = {
  data: AuthenticationData;
};

const initialState: AuthenticationState = {
  data: {
    ldap: null,
    oauth: null,
    google: null,
    authenticationType: null,
  },
};

const authenticationState = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },

    setLDAP(state, action) {
      state.data.ldap = action.payload;
    },

    setOAuth(state, action) {
      state.data.oauth = action.payload;
    },

    setGoogle(state, action) {
      state.data.google = action.payload;
    },

    setAuthenticationType(state, action) {
      state.data.authenticationType = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setGoogle, setLDAP, setOAuth, setAuthenticationType, setData } =
  authenticationState.actions;

export default authenticationState.reducer;
