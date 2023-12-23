import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  pageTitles: {
    [key: string]: string;
  };

  expandedLinks: {
    [key: string]: boolean;
  };

  modalBoolObject: {
    [key: string]: boolean;
  };

  modalId: string;
};

const initialState: UIState = {
  expandedLinks: {},
  modalBoolObject: {},
  modalId: "",
  pageTitles: {
    ddx: "DDX",
    accounts: "Accounts",
    licensing: "Licensing",
    ou: "Organization Units",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setOpenModal(state, action: PayloadAction<string>) {
      state.modalBoolObject[action.payload] = true;
    },

    setCloseModal(state, action: PayloadAction<string>) {
      state.modalBoolObject[action.payload] = false;
    },

    setExpandedLinks(state, action) {
      const { linkName, expanded } = action.payload;
      state.expandedLinks[linkName] = expanded;
    },

    setModalId(state, action) {
      state.modalId = action.payload;
    },

    removeModalId(state) {
      state.modalId = "";
    },
  },

  extraReducers: (builder) => {},
});

export const {
  setModalId,
  setOpenModal,
  removeModalId,
  setCloseModal,
  setExpandedLinks,
} = uiSlice.actions;

export default uiSlice.reducer;
