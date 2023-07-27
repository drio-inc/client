import { createSlice } from "@reduxjs/toolkit";

type MetadatSlice = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: MetadatSlice = {
  rows: [
    {
      id: "1",
      logisticsTripData: "Market/Regular",
      sampleValue: "MVCV0000927 /082021",
      dataType: "Str (256)",
      visibility: "Hide",
      metadata: "time, date, address",
      lastUpdated: "12/06/2020 10:39",
    },
    {
      id: "2",
      logisticsTripData: "BookingID",
      sampleValue: "TVSLSL-PUZHAL-HUB,CHENNAI",
      dataType: "Lat-Long",
      visibility: "Hide",
      metadata: "date, address",
      lastUpdated: "12/06/2020 10:39",
    },
    {
      id: "3",
      logisticsTripData: "Service Record",
      sampleValue: "13.1550,80.1960",
      dataType: "KA590408",
      visibility: "Hide",
      metadata: "date, address",
      lastUpdated: "12/06/2020 10:39",
    },
    {
      id: "4",
      logisticsTripData: "Planned_ETA",
      sampleValue: "05:09:00",
      dataType: "Market",
      visibility: "Hide",
      metadata: "date, address",
      lastUpdated: "12/06/2020 10:39",
    },
  ],
  selectedRows: [],
};

const metadatSlice = createSlice({
  name: "metadata",
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

export const { setRows, setSelectedRows } = metadatSlice.actions;

export default metadatSlice.reducer;
