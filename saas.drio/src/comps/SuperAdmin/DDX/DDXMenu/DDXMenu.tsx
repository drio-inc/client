import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import {
  setOpenModal,
  setOpenEditModal,
  setOpenDetailsModal,
} from "@/state/slices/uiSlice";
import { setRows, setSelectedRows } from "@/state/slices/adminAccountSlice";
import Link from "next/link";

const AccountMenu = ({ row, editForm, detailsWindow }: any) => {
  const dispatch = useAppDispatch();
  const { openEditModal, openDetailsModal, openModal } = useAppSelector(
    (state) => state.ui
  );

  const adminAccountState = useAppSelector((state) => state.adminAccount);

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
          className="bg-white rounded-lg shadow-lg text-sm text-gray-700"
        >
          <span
            className={
              "cursor-pointer hover:bg-indigo-50 w-full block text-drio-red-dark py-2 px-4"
            }
          >
            <Link href={`/ddx/${row.account}/dashboard`}>View Dashboard</Link>
          </span>

          <span
            className={
              "cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4"
            }
          >
            Update License
            {/* {detailsWindow && (
              <Modal
                label="Update License"
                toggleState={openDetailsModal}
                onClick={() => dispatch(setOpenDetailsModal(!openDetailsModal))}
              >
                {detailsWindow}
              </Modal>
            )} */}
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AccountMenu;
