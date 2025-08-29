import { eventsApi } from "@/api/events";
import { createSlice } from "@reduxjs/toolkit";

type EventState = {
  rows: TableRow[];
  selectedRows: number[];

  selectedItem: {
    id: string;
    name: string;
    model: string;
    year: string;
    sku: string;
    weight: number;
    volume: number;
    order_id: string;
    dealer_name: string;
    desired_ETA: string;
    ship_to_location: string;
    shipment_quantity: number;
    inventory_location: string;
  } | null;
};

const initialState: EventState = {
  rows: [],
  selectedRows: [],
  selectedItem: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setselectedItem(state, action) {
      state.selectedItem = action.payload;
    },
  },

  extraReducers: (builder) => {
  },
});

export const { setRows, setSelectedRows, setselectedItem } =
  eventSlice.actions;

export default eventSlice.reducer;
