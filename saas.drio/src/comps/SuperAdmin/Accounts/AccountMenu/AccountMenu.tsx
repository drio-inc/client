import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import AddOrgAccountForm from "@comps/SuperAdmin/OrgUnits/AddOrgUnitForm";

import DeleteAccount from "../DeleteAccount";
import AccountDetails from "../AccountDetails";
import EditAccountForm from "../EditAccountForm";
import { setOpenModal } from "@/state/slices/uiSlice";

import { setAccountId } from "@/state/slices/accountSlice";

const AccountMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();

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
            <Modal
              label="Edit"
              identifier="editAccountForm"
              onClick={() => dispatch(setOpenModal("editAccountForm"))}
            >
              <EditAccountForm row={row} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="View"
              identifier="detailsWindow"
              onClick={() => dispatch(setOpenModal("detailsWindow"))}
            >
              <AccountDetails row={row} />
            </Modal>
          </span>

          <span className={"cursor-pointer block hover:bg-indigo-50"}>
            <Modal
              label="Add New OU"
              identifier="addOrgUnitForm"
              onClick={() => {
                dispatch(setAccountId(row.id));
                dispatch(setOpenModal("addOrgUnitForm"));
              }}
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
