import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  openModal: boolean;
  openEditModal: boolean;
  openDeleteModal: boolean;
  openDetailsModal: boolean;
  expandedLinks: string[];
};

const initialState: UIState = {
  openModal: false,
  openEditModal: false,
  openDeleteModal: false,
  openDetailsModal: false,
  expandedLinks: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setExpandedLinks(state, action) {
      state.expandedLinks = action.payload;
    },

    setOpenModal(state, action) {
      state.openModal = action.payload;
    },

    setOpenEditModal(state, action) {
      state.openEditModal = action.payload;
    },

    setOpenDeleteModal(state, action) {
      state.openDeleteModal = action.payload;
    },

    setOpenDetailsModal(state, action) {
      state.openDetailsModal = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const {
  setOpenModal,
  setOpenEditModal,
  setOpenDeleteModal,
  setOpenDetailsModal,
  setExpandedLinks,
} = uiSlice.actions;

export default uiSlice.reducer;
