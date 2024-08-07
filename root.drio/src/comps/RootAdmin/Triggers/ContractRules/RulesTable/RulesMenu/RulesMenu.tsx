import Modal from "@/comps/ui/Modal";
import AlertModal from "@ui/AlertModal";
import EditRuleForm from "../EditRuleForm";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { setOpenModal } from "@/state/slices/uiSlice";
import { setRuleRows } from "@/state/slices/contractRuleSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const RulesMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const { ruleRows } = useAppSelector((state) => state.contractRule);
  const findRule = ruleRows.find((rule) => rule?.id === row.id);

  const deleteRule = (id: number | string) => {
    const findSubrule = findRule?.subrules?.find((subrule) => subrule?.id === id);
    if (findSubrule) {
      dispatch(
        setRuleRows([
          ...ruleRows.filter((rule) => rule?.id !== row.id),
          {
            ...findRule,
            subrules: findRule?.subrules?.filter((subrule) => subrule?.id !== id),
          },
        ])
      );
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <HiDotsVertical />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="left"
          align="center"
          sideOffset={5}
          className="bg-white rounded-lg shadow-lg text-sm text-gray-700"
        >
          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="Edit"
              identifier="editRuleForm"
              onClick={() => dispatch(setOpenModal("editRuleForm"))}
            >
              <EditRuleForm row={findRule} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <AlertModal row={row} accessor={row.ou} onClick={() => deleteRule(row.subrule_id)} />
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default RulesMenu;
