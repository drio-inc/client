import { v4 as uuidv4 } from "uuid";
import Modal from "@/comps/ui/Modal";
import AlertModal from "@ui/AlertModal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { setOpenModal } from "@/state/slices/uiSlice";
import UpdateRuleTemplateForm from "../UpdateRuleTemplateForm";
import { setRows, setSelectedRows } from "@/state/slices/ruleTemplateSlice";
import showAlert from "@/comps/ui/Alert/Alert";

const RuleTemplatesMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const ruleTemplateState = useAppSelector((state) => state.ruleTemplate);

  const deleteRow = (id: string) => {
    dispatch(setRows(ruleTemplateState.rows.filter((row) => row.id !== id)));
    dispatch(setSelectedRows([]));
  };

  const handleToggle = () => {
    dispatch(
      setRows(
        ruleTemplateState.rows.map((templateRow) =>
          templateRow.id === row.id
            ? { ...templateRow, enabled: templateRow.enabled === "yes" ? "no" : "yes" }
            : templateRow
        )
      )
    );

    showAlert("Rule updated successfully", "success");
  };

  const handleClone = () => {
    const findRow = ruleTemplateState.rows.find((templateRow) => templateRow.id === row.id);
    dispatch(setRows([...ruleTemplateState.rows, { ...findRow, id: uuidv4() }]));
    showAlert("Rule cloned successfully", "success");
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
              identifier="updateRuleTemplateForm"
              onClick={() => dispatch(setOpenModal("updateRuleTemplateForm"))}
            >
              <UpdateRuleTemplateForm row={row} clone={false} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <AlertModal row={row} accessor={row.name} onClick={() => deleteRow(row.id)} />
          </span>

          <Popover.Close
            onClick={handleToggle}
            className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left"
          >
            {row.enabled === "yes" ? "Disable" : "Enable"}
          </Popover.Close>

          <span className="cursor-pointer hover:bg-indigo-50 text-left">
            <Modal
              label="Clone"
              identifier="cloneRuleTemplateForm"
              onClick={() => dispatch(setOpenModal("cloneRuleTemplateForm"))}
            >
              <UpdateRuleTemplateForm row={row} clone={true} />
            </Modal>
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default RuleTemplatesMenu;
