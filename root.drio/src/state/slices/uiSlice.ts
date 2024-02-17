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

  notification: string;
  showSidebar: boolean;
};

const initialState: UIState = {
  notification: "",
  expandedLinks: {},
  showSidebar: false,
  modalBoolObject: {},
  pageTitles: {
    ddx: "DDX",
    accounts: "Accounts",
    licensing: "Licensing",
    ou: "Organization Units",
    "new policy": "Policies",
    metadata: "Discovered Metadata",
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

    closeAllModals(state) {
      Object.keys(state.modalBoolObject).forEach((key) => {
        state.modalBoolObject[key] = false;
      });
    },

    setNotification(state, action) {
      state.notification = action.payload;
    },

    setShowSidebar(state, action: PayloadAction<boolean>) {
      state.showSidebar = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export const {
  setOpenModal,
  setCloseModal,
  setShowSidebar,
  closeAllModals,
  setNotification,
  setExpandedLinks,
} = uiSlice.actions;

export default uiSlice.reducer;
