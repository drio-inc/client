import type { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalMeta {
  [name: string]: any;
}

export type Modal = {
  id: string;
  open: boolean;
  meta?: ModalMeta;
};

export type ModalMap = {
  [id: string]: Modal;
};

export type UIState = {
  modal: ModalMap;
  [key: string]: any;
};

const initialState: UIState = {
  modal: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ modalFileName: string; meta: ModalMeta }>
    ) => {
      const { modalFileName, meta } = action.payload;
      console.log({ modalFileName, meta });
      state.modal["modalFileName"] = { id: modalFileName, open: true };
    },

    closeModal: (state, action: PayloadAction<string>) => {
      const modalFileName = action.payload;
      state.modal[modalFileName] = {
        ...state.modal[modalFileName],
        open: false,
      };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

export const getOpenModalsList = (state: RootState): string[] =>
  Object.keys(state.modal).filter((modalId) => state.modal[modalId].open);

export const isModalOpen = (state: RootState, id: string): boolean =>
  state.modal[id]?.open ?? false;

export const getModalMeta = (
  id: string,
  state: RootState
): ModalMeta | undefined => state.modal[id]?.meta;
