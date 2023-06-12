import { createSlice } from "@reduxjs/toolkit";

type dataContractSlice = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: dataContractSlice = {
  rows: [
    {
      id: "1",
      ou: "KBB Kafka",
      dataset: "Kafka",
      personaList: "Marketing, Finance",
      dateOfRequest: "11/11/2023",
      status: "Being Approved",
      frequency: 25,
      expiryDate: "12/12/2023",
      alerts: 8,
    },
    {
      id: "2",
      ou: "Dealer Kafka",
      dataset: "Kafka",
      personaList: "Marketing, Finance",
      dateOfRequest: "11/11/2023",
      status: "Pending",
      frequency: 25,
      expiryDate: "12/12/2023",
      alerts: 8,
    },
    {
      id: "3",
      ou: "Policy-GDPR",
      dataset: "Kafka",
      personaList: "Marketing, Finance",
      dateOfRequest: "11/11/2023",
      status: "Rejected",
      frequency: 25,
      expiryDate: "12/12/2023",
      alerts: 8,
    },
    {
      id: "4",
      ou: "MySQL-DT",
      dataset: "Kafka",
      personaList: "Marketing, Finance",
      dateOfRequest: "11/11/2023",
      status: "Pending",
      frequency: 25,
      expiryDate: "12/12/2023",
      alerts: 8,
    },
  ],
  selectedRows: [],
};

const dataContractSlice = createSlice({
  name: "dataContract",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows } = dataContractSlice.actions;

export default dataContractSlice.reducer;
