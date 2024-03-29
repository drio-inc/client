import { createSlice } from "@reduxjs/toolkit";

type User = {
  username: string;
  user_type: string;
};

type AuthState = {
  token?: string;
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  token: "",
  user: null,
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

    setToken(state, action) {
      state.token = action.payload;
    },

    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    logout: (state) => {
      state.token = "";
      state.user = null;
      state.isAuthenticated = false;
      window.localStorage.clear();
      window.sessionStorage.clear();
    },
  },

  extraReducers: (builder) => {},
});

export const { setUser, setAuthenticated, logout, setToken } =
  authSlice.actions;

export default authSlice.reducer;
