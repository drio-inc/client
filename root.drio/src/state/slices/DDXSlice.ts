import { createSlice } from "@reduxjs/toolkit";

type DDXState = {
  rows: TableRow[];
  selectedRows: number[];
  licenseDetails: {
    [key: string]: string;
  };
};

const initialState: DDXState = {
  rows: [
    {
      id: "1",
      name: "Cox Cluster 2",
      ou: "Corp",
      status: "Active",
      clusterVCPU: 25,
      clusterMemory: "2 GB",
      clusterStorage: "1 TB",
      infraProvider: "AWS",
      country: "Armenia",
      swVersion: "1.0.2.03232023",
    },
    {
      id: "2",
      name: "DT DDX Cluster 7",
      ou: "Corp",
      status: "Pending",
      clusterVCPU: 25,
      clusterMemory: "2 GB",
      clusterStorage: "1 TB",
      infraProvider: "GCP",
      country: "Belarus",
      swVersion: "1.0.2.03232023",
    },
    {
      id: "3",
      name: "KBB DDX Cluster 1",
      ou: "Corp",
      status: "Not Configured",
      clusterVCPU: 25,
      clusterMemory: "2 GB",
      clusterStorage: "1 TB",
      infraProvider: "Azure",
      country: "Russia",
      swVersion: "1.0.2.03232023",
    },
    {
      id: "4",
      name: "Cox Cluster 1",
      ou: "Corp",
      status: "Active",
      clusterVCPU: 25,
      clusterMemory: "2 GB",
      clusterStorage: "1 TB",
      infraProvider: "AWS",
      country: "Ukraine",
      swVersion: "1.0.2.03232023",
    },
  ],
  selectedRows: [],
  licenseDetails: {},
};

const DDXSlice = createSlice({
  name: "DDX",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setLicenseDetails(state, action) {
      state.licenseDetails = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setLicenseDetails } = DDXSlice.actions;

export default DDXSlice.reducer;
