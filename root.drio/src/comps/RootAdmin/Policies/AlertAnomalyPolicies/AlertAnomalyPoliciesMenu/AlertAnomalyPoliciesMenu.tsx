import Link from "next/link";
import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import AlertModal from "@/comps/ui/AlertModal";
import { setOpenModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRows } from "@/state/slices/datasetSlice";

const AlertAnomalyPoliciesMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const datasetState = useAppSelector((state) => state.dataset);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(datasetState.rows.filter((row) => row.id !== id)));
    dispatch(setSelectedRows([]));
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
          <Popover.Close className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left">
            View
          </Popover.Close>

          <Popover.Close className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left">
            Edit
          </Popover.Close>

          <Popover.Close className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left">
            Delete
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AlertAnomalyPoliciesMenu;
