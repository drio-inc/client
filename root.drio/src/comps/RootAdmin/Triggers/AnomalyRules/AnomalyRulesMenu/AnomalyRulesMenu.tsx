import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRows } from "@/state/slices/anomalyPoliciesSlice";
import showAlert from "@/comps/ui/Alert/Alert";

const AnomalyRulesMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const anomalyRulesState = useAppSelector((state) => state.anomalyPolicies);

  console.log(row);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(anomalyRulesState.rows.filter((row) => row.id !== id)));
    dispatch(setSelectedRows([]));

    showAlert("Anomaly Rule has been deleted successfully", "success");
  };

  const handleDisable = (id: number | string) => {
    dispatch(
      setRows(
        anomalyRulesState.rows.map((row) => {
          if (row.id === id) {
            return {
              ...row,
              active: !row.active,
            };
          }

          return row;
        })
      )
    );

    showAlert("Anomaly Rule has been updated successfully", "success");
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
          <Popover.Close className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left">
            Edit
          </Popover.Close>

          <Popover.Close
            className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left"
            onClick={() => handleDisable(row.id)}
          >
            {row.active ? "Disable" : "Enable"}
          </Popover.Close>

          <Popover.Close
            onClick={() => deleteRow(row.id)}
            className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left"
          >
            Delete
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AnomalyRulesMenu;
