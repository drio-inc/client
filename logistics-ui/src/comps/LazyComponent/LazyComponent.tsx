import { Suspense, lazy } from "react";
import { UIState } from "@state/slices/modalSlice";
import { closeModal } from "@state/slices/modalSlice";
import ErrorBoundary from "@comps/ErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import { isModalOpen, getModalMeta } from "@state/slices/modalSlice";

interface ILazyComponentProps {
  filename: string;
}

export default function LazyComponent({ filename }: ILazyComponentProps) {
  console.log(`loading ./${filename}/${filename}.tsx`);

  const dispatch = useDispatch();
  const isOpen = useSelector<UIState, boolean>((state) =>
    isModalOpen(state, filename)
  );
  const meta = useSelector<UIState, ModalMeta | undefined>((state) =>
    getModalMeta(state, filename)
  );

  const handleModalClose = () => {
    dispatch(closeModal(filename));
  };

  const Component = lazy(() => import(`./${filename}/${filename}.tsx`));

  return (
    <Suspense fallback={null}>
      <ErrorBoundary>
        {filename ? (
          <Component isOpen={isOpen} onClose={handleModalClose} {...meta} />
        ) : null}
      </ErrorBoundary>
    </Suspense>
  );
}
