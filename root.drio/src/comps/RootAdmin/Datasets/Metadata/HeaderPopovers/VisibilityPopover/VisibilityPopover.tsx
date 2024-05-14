import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import showAlert from "@/comps/ui/Alert/Alert";
import { setRows } from "@/state/slices/metadataSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const VisibilityPopover = () => {
  const dispatch = useAppDispatch();
  const metadataState = useAppSelector((state) => state.metadata);

  const setVisibility = (
    action: "Public" | "Hidden" | "Internal" | "Randomize" | "Hash" = "Hidden"
  ) => {
    dispatch(
      setRows(
        metadataState.rows.map((row) => {
          return {
            ...row,
            visibility: action,
          };
        })
      )
    );

    showAlert(`All metadata are now of type ${action.toLowerCase()}!`, "success");
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
            onClick={() => setVisibility("Public")}
            className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4 text-left"
          >
            All Public
          </Popover.Close>

          <Popover.Close
            onClick={() => setVisibility("Hidden")}
            className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4 text-left"
          >
            All Hidden
          </Popover.Close>

          <Popover.Close
            onClick={() => setVisibility("Internal")}
            className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4 text-left"
          >
            All Internal
          </Popover.Close>

          <Popover.Close
            onClick={() => setVisibility("Randomize")}
            className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4 text-left"
          >
            All Randomize
          </Popover.Close>

          <Popover.Close
            onClick={() => setVisibility("Hash")}
            className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4 text-left"
          >
            All Hash
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default VisibilityPopover;
