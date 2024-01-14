import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRows } from "@/state/slices/metadataSlice";
import showAlert from "@/comps/ui/Alert/Alert";

const MetadataPopover = ({ row }: any) => {
  const dispatch = useAppDispatch();
  const metadataState = useAppSelector((state) => state.metadata);

  const approveOrRejectAll = (action: "Approved" | "Rejected" = "Approved") => {
    dispatch(
      setRows(
        metadataState.rows.map((row) => {
          return {
            ...row,
            tags: row.tags.map(
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

    showAlert(
      `All tags ${action === "Approved" ? "approved" : "rejected"}!`,
      "success"
    );
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <HiDotsVertical />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="end"
          side="bottom"
          sideOffset={20}
          className="bg-white rounded-lg shadow-lg text-sm text-gray-700"
        >
          <Popover.Close
            onClick={() => approveOrRejectAll("Approved")}
            className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4 text-left"
          >
            Accept All
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

export default MetadataPopover;
