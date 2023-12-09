import Modal from "@ui/Modal";
import ConfirmQuote from "../ConfirmQuote";
import showAlert from "@/comps/ui/Alert/Alert";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { setOpenModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const QuotesMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const { selectedItem } = useAppSelector((state) => state.inventory);

  const confirmQuote = () => {
    if (!selectedItem) {
      showAlert("Please select a product to get quotes", "error");
      return;
    }

    dispatch(setOpenModal("confirmQuote"));
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <HiDotsVertical />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="left"
          sideOffset={5}
          align="center"
          className="bg-white rounded-lg shadow-lg text-sm text-gray-700 flex flex-col"
        >
          {!selectedItem ? (
            <span
              className="inline-block cursor-pointer hover:bg-indigo-50 py-2 px-4"
              onClick={() =>
                showAlert("Please select a product to get quotes", "error")
              }
            >
              Book
            </span>
          ) : (
            <span className="inline-block cursor-pointer hover:bg-indigo-50">
              <Modal
                label="Book"
                onClick={confirmQuote}
                identifier="confirmQuote"
              >
                <ConfirmQuote row={row} />
              </Modal>
            </span>
          )}

          <span className="inline-block py-2 px-4 cursor-pointer hover:bg-indigo-50 ">
            Remove
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default QuotesMenu;
