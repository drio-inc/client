import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import AlertModal from "@/comps/ui/AlertModal";
import showAlert from "@/comps/ui/Alert/Alert";
import EditMetadataForm from "../EditMetadataForm";
import { setOpenModal } from "@/state/slices/uiSlice";
import { setRows, setSelectedRows } from "@/state/slices/metadataSlice";

const MetadataMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const metadataState = useAppSelector((state) => state.metadata);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(metadataState.rows.filter((row) => row.id !== id)));
    dispatch(setSelectedRows([]));
  };

  const approveOrRejectAll = (action: "Approved" | "Rejected" = "Approved") => {
    dispatch(
      setRows(
        metadataState.rows.map((metadataRow) => {
          if (metadataRow.id !== row.id) return metadataRow;

          return {
            ...metadataRow,
            key_name_tags: metadataRow.key_name_tags.map(
              (meta: { id: string; name: string; status: string }) => {
                return {
                  ...meta,
                  status: action,
                };
              }
            ),
            data_field_tags: metadataRow.data_field_tags.map(
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
              identifier="editMetadataForm"
              onClick={() => dispatch(setOpenModal("editMetadataForm"))}
            >
              <EditMetadataForm row={row} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <AlertModal row={row} accessor={row.dataset} onClick={() => deleteRow(row.id)} />
          </span>

          <Popover.Close
            onClick={() => approveOrRejectAll("Approved")}
            className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4 text-left"
          >
            Approve All
          </Popover.Close>

          <Popover.Close
            onClick={() => approveOrRejectAll("Rejected")}
            className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4 text-left"
          >
            Reject All
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default MetadataMenu;
