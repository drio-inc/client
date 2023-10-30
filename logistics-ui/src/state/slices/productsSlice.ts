import productData from "@data/products.json";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductsState = {
  rows: TableRow[];
  selectedRows: number[];
  selectedProduct: {
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

const initialState: ProductsState = {
  rows: productData,
  selectedRows: [],
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setRows(state, action) {
      state.rows = action.payload;
    },

    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },

    setSelectedproduct(state, action) {
      state.selectedProduct = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setRows, setSelectedRows, setSelectedproduct } =
  productsSlice.actions;

export default productsSlice.reducer;
