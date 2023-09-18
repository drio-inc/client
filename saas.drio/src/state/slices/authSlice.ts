import { createSlice } from "@reduxjs/toolkit";

type User = {
  username: string;
  user_type: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  role: string;
  authMode: "ldap" | "google" | "oauth" | "";
};

const initialState: AuthState = {
  role: "",
  user: null,
  authMode: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    setAuthMode: (state, action) => {
      state.authMode = action.payload;
    },

    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    setRole: (state, action) => {
      state.role = action.payload;
    },

    logOut: (state) => {
      state.role = "";
      state.user = null;
      state.authMode = "";
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {},
});

export const { setUser, setAuthMode, setAuthenticated, setRole, logOut } =
  authSlice.actions;

export default authSlice.reducer;
