import Modal from "@/comps/ui/Modal";
import { useRouter } from "next/router";
import AlertModal from "@ui/AlertModal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import AddNewRuleForm from "../AddNewRuleForm";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { setRuleRows, setSelectedRuleRows } from "@/state/slices/policiesSlice";

const PolicyRulesMenu = ({ row }: TableRow) => {
  const router = useRouter();
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
            <Modal
              label="Edit"
              identifier="addNewRuleForm"
              onClick={() => router.push("/policies/new-policy")}
            >
              <AddNewRuleForm />
            </Modal>
          </span>

          {/* <span
            onClick={() => dispatch(setCloseModal("policyRulesTable"))}
            className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4"
          >
            <AlertModal
              row={row}
              accessor={row.name}
              onClick={() => {
                deleteRow(row.id);
                dispatch(setCloseModal("policyRulesTable"));
              }}
            />
          </span> */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PolicyRulesMenu;
