import Modal from "@/comps/ui/Modal";
import { useRouter } from "next/router";
import AlertModal from "@ui/AlertModal";
import EditRuleForm from "../EditRuleForm";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { setOpenModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const RulesMenu = ({ row }: TableRow) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { ruleRows } = useAppSelector((state) => state.policies);

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
              <EditRuleForm row={ruleRows} />
            </Modal>
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default RulesMenu;
