import Modal from "@/comps/ui/Modal";
import AlertModal from "@ui/AlertModal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { setOpenModal } from "@/state/slices/uiSlice";
import { setRows, setSelectedRows } from "@/state/slices/adminOrgAccountSlice";

const AccountMenu = ({ row, editForm }: any) => {
  const dispatch = useAppDispatch();
  const { openEditModal } = useAppSelector((state) => state.ui);
  const adminOrgAccountState = useAppSelector((state) => state.adminOrgAccount);

  const deleteRow = (id: any) => {
    dispatch(setRows(adminOrgAccountState.rows.filter((row) => row.id !== id)));
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

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            {editForm && (
              <Modal
                label="Edit"
                identifier="editOrgAccountForm"
                onClick={() => dispatch(setOpenModal("editOrgAccountForm"))}
              >
                {editForm}
              </Modal>
            )}
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AccountMenu;
