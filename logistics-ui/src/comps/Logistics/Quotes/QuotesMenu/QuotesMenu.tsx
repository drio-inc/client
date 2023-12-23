import showAlert from "@/comps/ui/Alert/Alert";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { setModalId } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const QuotesMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const { selectedItem } = useAppSelector((state) => state.inventory);

  const confirmQuote = () => {
    if (!selectedItem) {
      showAlert("Please select a product to get quotes", "error");
      return;
    }

    dispatch(setModalId("confirmQuote"));
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
          <Popover.Close
            onClick={confirmQuote}
            className="w-full flex hover:bg-indigo-50"
          >
            <span className="inline-block py-2 px-4 cursor-pointer">Book</span>
          </Popover.Close>

          <Popover.Close className="w-full flex hover:bg-indigo-50">
            <span className="inline-block py-2 px-4 cursor-pointer">
              Remove
            </span>
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default QuotesMenu;
