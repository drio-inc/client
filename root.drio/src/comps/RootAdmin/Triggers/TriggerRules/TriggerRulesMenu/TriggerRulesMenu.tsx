import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import Modal from "@/comps/ui/Modal";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRows } from "@/state/slices/datasetSlice";
import { setOpenModal } from "@/state/slices/uiSlice";
import UpdateTriggerRuleForm from "../UpdateTriggerRuleForm";

const TriggerRulesMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const triggerRuleState = useAppSelector((state) => state.alertPolicies);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(triggerRuleState.rows.filter((row) => row.id !== id)));
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
          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="Edit"
              identifier="updateTriggerRuleForm"
              onClick={() => dispatch(setOpenModal("updateTriggerRuleForm"))}
            >
              <UpdateTriggerRuleForm row={row} clone={false} />
            </Modal>
          </span>

          <Popover.Close className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left">
            Disable
          </Popover.Close>

          <Popover.Close className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left">
            Delete
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default TriggerRulesMenu;
