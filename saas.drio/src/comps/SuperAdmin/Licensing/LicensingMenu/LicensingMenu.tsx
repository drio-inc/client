import Modal from "@/comps/ui/Modal";
import AlertModal from "@ui/AlertModal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import AddOrgAccountForm from "../../OrgAccounts/AddOrgAccountForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { setOpenModal } from "@/state/slices/uiSlice";
import { setRows, setSelectedRows } from "@/state/slices/licensingSlice";
import CreateKeyForm from "../CreateKeyForm";

const LicensingMenu = ({ row, editForm, detailsWindow }: any) => {
  const dispatch = useAppDispatch();
  const licensingState = useAppSelector((state) => state.licensing);

  const deleteRow = (id: string) => {
    dispatch(setRows(licensingState.rows.filter((row) => row.id !== id)));
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
              accessor={row.account}
              onClick={() => deleteRow(row.id)}
            />
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            {editForm && (
              <Modal
                label="Edit"
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
              label="Create Key"
              identifier="createKeyForm"
              onClick={() => dispatch(setOpenModal("createKeyForm"))}
            >
              <CreateKeyForm />
            </Modal>
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default LicensingMenu;
