import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { setOpenModal } from "@/state/slices/uiSlice";
import Link from "next/link";
import AlertModal from "@/comps/ui/AlertModal";
import { setRows, setSelectedRows } from "@/state/slices/DDXSlice";

const AccountMenu = ({ row, editForm, detailsWindow }: any) => {
  const dispatch = useAppDispatch();
  const ddxState = useAppSelector((state) => state.DDX);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(ddxState.rows.filter((row) => row.id !== id)));
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
          className="bg-white rounded-lg shadow-lg text-sm text-gray-700"
        >
          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <AlertModal
              row={row}
              accessor={row.ou}
              onClick={() => deleteRow(row.id)}
            />
          </span>

          <span
            className={
              "cursor-pointer hover:bg-indigo-50 w-full block text-drio-red-dark py-2 px-4"
            }
          >
            {/* <Link href={`/ddx/${row.account}/dashboard`}>View Dashboard</Link> */}
            View Dashboard
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            {editForm && (
              <Modal
                label="Update License"
                identifier="updateLicenseForm"
                onClick={() => dispatch(setOpenModal("updateLicenseForm"))}
              >
                {editForm}
              </Modal>
            )}
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            {detailsWindow && (
              <Modal
                label="Details"
                identifier="detailsWindow"
                onClick={() => dispatch(setOpenModal("detailsWindow"))}
              >
                {detailsWindow}
              </Modal>
            )}
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AccountMenu;
