import { ordersApi } from "@/api/orders";
import { productsApi } from "@/api/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InventoryState = {
  rows: TableRow[];
  orders: TableRow[];
  products: TableRow[];
  selectedRows: number[];

  selectedItem: {
    id: string;
    name: string;
    model: string;
    year: string;
    sku: string;
    weight: number;
    volume: number;
    orderId: string;
    dealerName: string;
    desiredETA: string;
    shipToLocation: string;
    shipmentQuantity: number;
    inventoryLocation: string;
  } | null;
};

const initialState: InventoryState = {
  rows: [],
  orders: [],
  products: [],
  selectedRows: [],
  selectedItem: null,
};

const inventorySlice = createSlice({
  name: "inventory",
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
    builder.addMatcher(
      productsApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        state.products = action.payload;
      }
    );
    builder.addMatcher(
      ordersApi.endpoints.getOrders.matchFulfilled,
      (state, action) => {
        state.orders = action.payload;
      }
    );
  },
});

export const { setRows, setSelectedRows, setselectedItem } =
  inventorySlice.actions;

export default inventorySlice.reducer;
