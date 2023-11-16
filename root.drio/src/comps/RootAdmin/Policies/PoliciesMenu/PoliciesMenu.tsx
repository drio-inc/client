import Modal from "@/comps/ui/Modal";
import AlertModal from "@ui/AlertModal";
import { useRouter } from "next/router";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { setOpenModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import {
  setRows,
  setRuleRows,
  setSelectedRows,
} from "@/state/slices/policiesSlice";
import PolicyRulesTable from "../RulesTable";

const PoliciesMenu = ({ row }: TableRow) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const policiesState = useAppSelector((state) => state.policies);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(policiesState.rows.filter((row) => row.id !== id)));
    dispatch(setSelectedRows([]));
  };

  const handleEdit = () => {
    dispatch(setRuleRows(row.rules));

    router.push({
      pathname: `/policies/${row.id}/edit-policy`,
      query: { row: JSON.stringify(row) },
    });
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
          <span
            onClick={handleEdit}
            className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4"
          >
            Edit
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="View"
              identifier="policyRulesTable"
              onClick={() => dispatch(setOpenModal("policyRulesTable"))}
            >
              <PolicyRulesTable modal={true} rows={row.rules} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <AlertModal
              row={row}
              accessor={row.ou}
              onClick={() => deleteRow(row.id)}
            />
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PoliciesMenu;
