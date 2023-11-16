import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

type MetadatSlice = {
  rows: TableRow[];
  selectedRows: number[];
};

const initialState: MetadatSlice = {
  rows: [
    {
      id: "1",
      visibility: "Hide",
      dataType: "Str (256)",
      name: "Market/Regular",
      lastUpdated: "12/06/2020",
      sampleValue: "MVCV0000927 /082021",
      tags: [
        {
          id: "1",
          name: "Date",
          status: "Rejected",
        },
        {
          id: "2",
          name: "Address",
          status: "Pending",
        },
      ],
    },
    {
      id: "2",
      name: "BookingID",
      visibility: "Hide",
      dataType: "Lat-Long",
      lastUpdated: "12/06/2020",
      sampleValue: "TVSLSL-PUZHAL-HUB,CHENNAI",
      tags: [
        {
          id: "1",
          name: "Date",
          status: "Approved",
        },
        {
          id: "2",
          name: "Address",
          status: "Pending",
        },
      ],
    },
    {
      id: "3",
      visibility: "Hide",
      dataType: "KA590408",
      name: "Service Record",
      sampleValue: "13.1550,80.1960",
      lastUpdated: "12/06/2020",
      tags: [
        {
          id: "1",
          name: "Date",
          status: "Approved",
        },
        {
          id: "2",
          name: "Address",
          status: "Approved",
        },
      ],
    },
    {
      id: "4",
      visibility: "Hide",
      dataType: "Market",
      name: "Planned_ETA",
      sampleValue: "05:09:00",
      lastUpdated: "12/06/2020",
      tags: [
        {
          id: "1",
          name: "Date",
          status: "Approved",
        },
        {
          id: "2",
          name: "Address",
          status: "Approved",
        },
      ],
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
