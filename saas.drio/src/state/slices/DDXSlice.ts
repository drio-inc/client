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
    // {
    //   id: "1",
    //   name: "DDX 1",
    //   account: "Harley Davidson",
    //   location: "Menomonee Falls, WI, US",
    //   status: "Active",
    //   clusterVCPU: 25,
    //   clusterMemory: "2 GB",
    //   clusterStorage: "1 TB",
    //   infraProvider: "AWS",
    //   country: "Armenia",
    //   ddxVersion: "1.0.2.03232023",
    // },
    // {
    //   id: "2",
    //   name: "DDX 2",
    //   account: "Cox",
    //   location: "Manaus, AM, BR",
    //   status: "Pending",
    //   clusterVCPU: 25,
    //   clusterMemory: "2 GB",
    //   clusterStorage: "1 TB",
    //   infraProvider: "Data Center",
    //   country: "USA",
    //   ddxVersion: "1.0.2.03232023",
    // },
    // {
    //   id: "3",
    //   name: "DDX 3",
    //   account: "Cox",
    //   location: "York, PA, US",
    //   status: "Not Configured",
    //   clusterVCPU: 25,
    //   clusterMemory: "2 GB",
    //   clusterStorage: "1 TB",
    //   infraProvider: "Azure",
    //   country: "Russia",
    //   ddxVersion: "1.0.2.03232023",
    // },
    // {
    //   id: "4",
    //   name: "DDX 4",
    //   account: "Paypal",
    //   location: "Tomahawk, WI, US",
    //   status: "Active",
    //   clusterVCPU: 25,
    //   clusterMemory: "2 GB",
    //   clusterStorage: "1 TB",
    //   infraProvider: "Data Center",
    //   country: "USA",
    //   ddxVersion: "1.0.2.03232023",
    // },
  ],
  selectedRows: [],

  licenseDetails: {
    datasets: "100",
    contract: "100",
    accessRate: "100/day",
    expiryDate: "2021-12-31",
    logStorage: "100",
    metricsStorage: "100",
  },
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
