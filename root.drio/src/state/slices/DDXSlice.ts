import { createSlice } from "@reduxjs/toolkit";

type DDXState = {
  rows: DDXCluster[];
  clusterToken: string;
  selectedRows: number[];
  currentDDXCluster: DDXCluster | null;
  licenseDetails: {
    [key: string]: string;
  };
};

const initialState: DDXState = {
  rows: [],
  selectedRows: [],
  clusterToken: "",
  licenseDetails: {},
  currentDDXCluster: null,
};

const DDXSlice = createSlice({
  name: "DDX",
  initialState,
  reducers: {
    setCurrentDDXCluster(state, action) {
      state.currentDDXCluster = action.payload;
    },

    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setLicenseDetails(state, action) {
      state.licenseDetails = action.payload;
    },

    setClusterToken(state, action) {
      state.clusterToken = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const {
  setRows,
  setClusterToken,
  setSelectedRows,
  setLicenseDetails,
  setCurrentDDXCluster,
} = DDXSlice.actions;

export default DDXSlice.reducer;
