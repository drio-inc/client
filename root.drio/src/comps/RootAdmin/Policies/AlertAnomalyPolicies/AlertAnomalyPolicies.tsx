import Table from "@/comps/ui/Table";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setSelectedRows } from "@/state/slices/alertAnomalyPoliciesSlice";

import Modal from "@/comps/ui/Modal";
import Button from "@/comps/ui/Button";
import { IoRefresh } from "react-icons/io5";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import ThumbnailChart from "./ThumbnailChart";
import AlertAnomalyPoliciesMenu from "./AlertAnomalyPoliciesMenu";

const headers = [
  {
    header: "Alert Rule",
    accessor: "alertRule",
  },
  {
    header: "Trigger",
    accessor: "trigger",
  },
  {
    header: "Data Resource",
    accessor: "dataResource",
  },
  {
    header: "Threshold Value",
    accessor: "thresholdValue",
  },
  {
    header: "Message",
    accessor: "message",
  },
  {
    type: "object",
    header: "Occurence History",
    accessor: "occurenceHistory",
  },
];

const AlertAnomalyPolicies = () => {
  const dispatch = useAppDispatch();
  const { rows, selectedRows } = useAppSelector(
    (state) => state.alertsAnomalyPolicies
  );

  const handleCheckbox = (index: number) => {
    if (selectedRows.includes(index)) {
      dispatch(setSelectedRows(selectedRows.filter((row) => row !== index)));
    } else {
      dispatch(setSelectedRows([...selectedRows, index]));
    }
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));

  const History = () => {
    return (
      <div className="flex gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">Last Occurence</span>
          <span className="text-sm font-medium">2 days ago</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">Total Occurences</span>
          <span className="text-sm font-medium">2</span>
        </div>
      </div>
    );
  };

  const transformData = () => {
    return rows.map((row: TableRow) => {
      return {
        alertRule: row.alertRule,
        trigger: row.trigger,
        dataResource: row.dataResource,
        thresholdValue: row.thresholdValue,
        message: row.message,
        occurenceHistory: <ThumbnailChart />,
      };
    });
  };

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div className="rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between">
          {selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={selectedRows.length > 0}
                onCheckedChange={() => clearSelectedRows?.()}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className="font-medium text-sm text-gray-700">
                {selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}

          <div className="flex gap-4 ml-auto">
            <Button
              icon={<HiPlus />}
              intent={"primary"}
              onClick={() =>
                dispatch(setOpenModal("addAlertAnomalyPolicyForm"))
              }
            >
              Add New Alert Anomaly Policy
            </Button>
          </div>

          <div className="hidden">
            <Modal identifier="addAlertAnomalyPolicyForm">
              <div className="p-4 flex flex-col justify-center gap-4">
                <h3>Form to be added</h3>
                <Button
                  intent={"secondary"}
                  onClick={() =>
                    dispatch(setCloseModal("addAlertAnomalyPolicyForm"))
                  }
                >
                  Cancel
                </Button>
              </div>
            </Modal>
          </div>
        </div>

        <Table
          headers={headers}
          rows={transformData()}
          selectedRows={selectedRows}
          menu={AlertAnomalyPoliciesMenu}
          handleCheckbox={handleCheckbox}
        />
      </div>
    </div>
  );
};

export default AlertAnomalyPolicies;
