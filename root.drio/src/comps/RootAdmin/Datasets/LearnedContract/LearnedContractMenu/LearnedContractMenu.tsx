import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import AlertModal from "@/comps/ui/AlertModal";
import showAlert from "@/comps/ui/Alert/Alert";
import { setOpenModal } from "@/state/slices/uiSlice";
import EditLearnedContractForm from "../EditLearnedContractForm";
import { setRows, setSelectedRows } from "@/state/slices/learnedContractSlice";

const LearnedContractMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const learnedContractState = useAppSelector((state) => state.learnedContract);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(learnedContractState.rows.filter((row) => row.id !== id)));
    dispatch(setSelectedRows([]));
  };

  const approveOrRejectAll = (action: "Approved" | "Rejected" = "Approved") => {
    dispatch(
      setRows(
        learnedContractState.rows.map((learnedContractRow) => {
          if (learnedContractRow.id !== row.id) return learnedContractRow;

          return {
            ...learnedContractRow,
            key_name_tags: learnedContractRow.key_name_tags.map(
              (meta: { id: string; name: string; status: string }) => {
                return {
                  ...meta,
                  status: action,
                };
              }
            ),
            data_field_tags: learnedContractRow.data_field_tags.map(
              (meta: { id: string; name: string; status: string }) => {
                return {
                  ...meta,
                  status: action,
                };
              }
            ),
          };
        })
      )
    );

    showAlert(`All tags are ${action}!`, "success");
  };

  const disableApproveButton = () => {
    return learnedContractState.rows
      .find((r) => r.id === row.id)
      ?.key_name_tags.some((t: any) => t.status === "Pending" || t.status === "Rejected") ||
      learnedContractState.rows
        .find((r) => r.id === row.id)
        ?.data_field_tags.some((t: any) => t.status === "Pending" || t.status === "Rejected")
      ? false
      : true;
  };

  const disableRejectButton = () => {
    return learnedContractState.rows
      .find((r) => r.id === row.id)
      ?.key_name_tags.some((t: any) => t.status === "Pending" || t.status === "Approved") ||
      learnedContractState.rows
        .find((r) => r.id === row.id)
        ?.data_field_tags.some((t: any) => t.status === "Pending" || t.status === "Approved")
      ? false
      : true;
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
              identifier="editLearnedContractForm"
              onClick={() => dispatch(setOpenModal("editLearnedContractForm"))}
            >
              <EditLearnedContractForm row={row} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <AlertModal row={row} accessor={row.dataset} onClick={() => deleteRow(row.id)} />
          </span>

          <Popover.Close
            disabled={disableApproveButton()}
            onClick={() => approveOrRejectAll("Approved")}
            className={`cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4 text-left ${
              disableApproveButton() && "opacity-50 pointer-events-none"
            }`}
          >
            Approve All
          </Popover.Close>

          <Popover.Close
            disabled={disableRejectButton()}
            onClick={() => approveOrRejectAll("Rejected")}
            className={`cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4 text-left ${
              disableRejectButton() && "opacity-50 pointer-events-none"
            }`}
          >
            Reject All
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default LearnedContractMenu;
