import { createSlice } from "@reduxjs/toolkit";

export type AuthenticationData = {
  cn: string;
  time: string;
  host: string;
  port: number;
  retries: number;
  dn_string: string;
  ldap_version: string;
};

type AuthenticationState = {
  data: AuthenticationData;
};

const initialState: AuthenticationState = {
  data: {
    time: "2021-09-01 12:00:00",
    host: "10.24.42.34",
    port: 8080,
    retries: 2,
    cn: "ON",
    dn_string: "ON",
    ldap_version: "2.22",
  },
};

const authenticationState = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setData } = authenticationState.actions;

export default authenticationState.reducer;
