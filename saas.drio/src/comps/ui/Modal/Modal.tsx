import * as CustomModal from "@radix-ui/react-alert-dialog";

interface IModalProps {
  label?: string;
  row?: TableRow;
  onClick?: () => void;
  toggleState?: boolean;
  children?: React.ReactNode;
}

const Modal = ({ label, children, onClick, toggleState }: IModalProps) => {
  return (
    <CustomModal.Root open={toggleState} onOpenChange={onClick}>
      <CustomModal.Trigger asChild>
        <span className="inline-block w-full py-2 px-4">{label}</span>
      </CustomModal.Trigger>

      <CustomModal.Portal>
        <CustomModal.Overlay className="bg-[#6B6B6B] data-[state=open]:animate-overlayShow fixed inset-0 opacity-40" />
        <CustomModal.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white shadow-sm focus:outline-none">
          {children}
        </CustomModal.Content>
      </CustomModal.Portal>
    </CustomModal.Root>
  );
};

export default Modal;
