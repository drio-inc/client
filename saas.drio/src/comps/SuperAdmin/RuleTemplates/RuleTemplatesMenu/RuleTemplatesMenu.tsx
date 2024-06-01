import Modal from "@/comps/ui/Modal";
import AlertModal from "@ui/AlertModal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { setOpenModal } from "@/state/slices/uiSlice";
import UpdateRuleTemplateForm from "../UpdateRuleTemplateForm";
import { setRows, setSelectedRows } from "@/state/slices/ruleTemplateSlice";

const RuleTemplatesMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const ruleTemplateState = useAppSelector((state) => state.ruleTemplate);

  const deleteRow = (id: string) => {
    dispatch(setRows(ruleTemplateState.rows.filter((row) => row.id !== id)));
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
              label="Edit"
              identifier="updateRuleTemplateForm"
              onClick={() => dispatch(setOpenModal("updateRuleTemplateForm"))}
            >
              <UpdateRuleTemplateForm row={row} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <AlertModal row={row} accessor={row.name} onClick={() => deleteRow(row.id)} />
          </span>

          <Popover.Close className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left">
            Disable
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default RuleTemplatesMenu;
