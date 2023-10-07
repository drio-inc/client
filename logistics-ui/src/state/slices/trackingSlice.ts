import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TrackingState = {};

const initialState: TrackingState = {};

const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {},

  extraReducers: (builder) => {},
});

export const {} = trackingSlice.actions;

export default trackingSlice.reducer;
