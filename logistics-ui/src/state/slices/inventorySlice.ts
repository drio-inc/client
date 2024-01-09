import orders from "@data/orders.json";
import products from "@data/products.json";
import inventory from "@data/inventory.json";

import { ordersApi } from "@/api/orders";
import { productsApi } from "@/api/products";
import { createSlice } from "@reduxjs/toolkit";

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
    order_id: string;
    dealer_name: string;
    desired_ETA: string;
    ship_to_location: string;
    shipment_quantity: number;
    inventory_location: string;
  } | null;
};

const initialState: InventoryState = {
  orders: orders,
  rows: inventory,
  selectedRows: [],
  selectedItem: null,
  products: products,
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
    // builder.addMatcher(
    //   productsApi.endpoints.getProducts.matchFulfilled,
    //   (state, action) => {
    //     state.products = action.payload;
    //   }
    // );
    // builder.addMatcher(
    //   ordersApi.endpoints.getOrders.matchFulfilled,
    //   (state, action) => {
    //     state.orders = action.payload;
    //   }
    // );
  },
});

export const { setRows, setSelectedRows, setselectedItem } =
  inventorySlice.actions;

export default inventorySlice.reducer;
