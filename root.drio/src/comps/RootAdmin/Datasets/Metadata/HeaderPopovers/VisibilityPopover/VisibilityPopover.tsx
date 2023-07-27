import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRows } from "@/state/slices/metadataSlice";

const VisibilityPopover = ({ row }: any) => {
  const dispatch = useAppDispatch();
  const metadataState = useAppSelector((state) => state.metadata);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <HiDotsVertical />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="end"
          side="bottom"
          sideOffset={20}
          className="bg-white rounded-lg shadow-lg text-sm text-gray-700"
        >
          <span
            className={
              "cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4"
            }
          >
            All Public
          </span>

          <span
            className={
              "cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4"
            }
          >
            All Hide
          </span>

          <span
            className={
              "cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4"
            }
          >
            All Internal
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default VisibilityPopover;
