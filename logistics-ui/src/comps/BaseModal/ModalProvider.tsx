// ./components/modal/ModalProvider.tsx
import { useSelector } from "react-redux";
import LazyComponent from "../LazyComponent";
import { getOpenModalsList } from "@state/slices/modalSlice";

interface IModalProviderProps {
  children: React.ReactNode;
}

export function ModalProvider(props: IModalProviderProps) {
  const modals = useSelector(getOpenModalsList);

  return (
    <>
      {modals.map((filename) => (
        <LazyComponent key={filename} filename={filename} />
      ))}
      {props.children}
    </>
  );
}
