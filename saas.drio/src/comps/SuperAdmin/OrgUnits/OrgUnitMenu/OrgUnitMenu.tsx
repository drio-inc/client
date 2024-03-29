import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import DeleteOrgUnit from "../DeleteOrgUnit";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRow, setRows, setSelectedRows } from "@/state/slices/orgUnitSlice";

import EditOrgUnitForm from "../EditOrgUnitForm";

const OrgUnitMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const orgUnitState = useAppSelector((state) => state.orgUnit);

  const deleteRow = (id: string) => {
    dispatch(setCloseModal("orgUnitTable"));
    dispatch(setRows(orgUnitState.rows.filter((row) => row.id !== id)));
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
          className="bg-white rounded-lg shadow-lg text-sm text-gray-700 z-[1001]"
        >
          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="Delete"
              identifier="deleteOrgUnit"
              onClick={() => {
                dispatch(setRow(row));
                dispatch(setCloseModal("orgUnitTable"));
                dispatch(setOpenModal("deleteOrgUnit"));
              }}
            >
              <DeleteOrgUnit />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              row={row}
              label="Edit"
              identifier="editOrgUnitForm"
              onClick={() => {
                dispatch(setRow(row));
                dispatch(setCloseModal("orgUnitTable"));
                dispatch(setOpenModal("editOrgUnitForm"));
              }}
            >
              <EditOrgUnitForm />
            </Modal>
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default OrgUnitMenu;
