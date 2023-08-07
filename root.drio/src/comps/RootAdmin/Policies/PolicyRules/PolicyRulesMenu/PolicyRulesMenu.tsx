import Modal from "@/comps/ui/Modal";
import AlertModal from "@ui/AlertModal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { setOpenModal } from "@/state/slices/uiSlice";
import { setRuleRows, setSelectedRuleRows } from "@/state/slices/policiesSlice";

const PolicyRulesMenu = ({ row, editForm }: any) => {
  const dispatch = useAppDispatch();
  const policiesState = useAppSelector((state) => state.policies);

  const deleteRow = (id: number | string) => {
    dispatch(
      setRuleRows(policiesState.ruleRows.filter((row) => row.id !== id))
    );
    dispatch(setSelectedRuleRows([]));
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

export default PolicyRulesMenu;