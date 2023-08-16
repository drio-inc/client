import Modal from "@/comps/ui/Modal";
import AlertModal from "@ui/AlertModal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import AddOrgAccountForm from "../../OrgUnits/AddOrgUnitForm";

import { setOpenModal } from "@/state/slices/uiSlice";
import { setRows, setSelectedRows } from "@/state/slices/accountSlice";
import DeleteAccount from "../DeleteAccount/DeleteAccount";

const AccountMenu = ({ row, editForm, detailsWindow }: any) => {
  const dispatch = useAppDispatch();
  const adminAccountState = useAppSelector((state) => state.account);

  const deleteRow = (id: string) => {
    dispatch(setRows(adminAccountState.rows.filter((row) => row.id !== id)));
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
            <Modal
              label="Delete"
              identifier="deleteAccountModal"
              onClick={() => dispatch(setOpenModal("deleteAccountModal"))}
            >
              <DeleteAccount accountId={row.id} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            {editForm && (
              <Modal
                label="Edit"
                identifier="editAccountForm"
                onClick={() => dispatch(setOpenModal("editAccountForm"))}
              >
                {editForm}
              </Modal>
            )}
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            {detailsWindow && (
              <Modal
                label="View"
                identifier="detailsWindow"
                onClick={() => dispatch(setOpenModal("detailsWindow"))}
              >
                {detailsWindow}
              </Modal>
            )}
          </span>
          <span className={"cursor-pointer block hover:bg-indigo-50"}>
            <Modal
              label="Add New OU"
              identifier="addOrgUnitForm"
              onClick={() => dispatch(setOpenModal("addOrgUnitForm"))}
            >
              <AddOrgAccountForm />
            </Modal>
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AccountMenu;
