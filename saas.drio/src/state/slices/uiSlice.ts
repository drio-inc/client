import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  [key: string]: boolean;
  // expandedLinks: string[];
};

const initialState: UIState = {
  // expandedLinks: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setOpenModal(state, action: PayloadAction<string>) {
      state[action.payload] = true;
    },

    setCloseModal(state, action: PayloadAction<string>) {
      state[action.payload] = false;
    },

    setExpandedLinks(state, action) {
      state.expandedLinks = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const { setOpenModal, setCloseModal, setExpandedLinks } =
  uiSlice.actions;

export default uiSlice.reducer;
