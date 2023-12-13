import { useCallback } from "react";
import { UIState } from "@state/slices/modalSlice";
import { isModalOpen } from "@state/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "@state/slices/modalSlice";

export function useModal(modalFileName: string) {
  const dispatch = useDispatch();

  const onOpen = useCallback(
    (meta: ModalMeta) => dispatch(openModal(modalFileName, meta)),
    [dispatch, modalFileName]
  );

  const onClose = useCallback(
    () => dispatch(closeModal(modalFileName)),
    [dispatch, modalFileName]
  );

  const isOpen = useSelector<UIState>((state) =>
    isModalOpen(state, modalFileName)
  );

  return {
    isOpen,
    onOpen,
    onClose,
  };
}
