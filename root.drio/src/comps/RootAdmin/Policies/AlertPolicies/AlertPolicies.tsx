import Table from "@/comps/ui/Table";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setSelectedRows } from "@/state/slices/alertPoliciesSlice";

import Modal from "@/comps/ui/Modal";
import Button from "@/comps/ui/Button";
import { IoRefresh } from "react-icons/io5";
import ThumbnailChart from "./ThumbnailChart";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import AlertPoliciesMenu from "./AlertPoliciesMenu";
import * as Checkbox from "@radix-ui/react-checkbox";
import AddAlertPolicyForm from "./AddAlertPolicyForm";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

const headers = [
  {
    header: "Alert Rule",
    accessor: "rule_template",
  },
  {
    header: "Data Source",
    accessor: "data_source",
  },
  {
    header: "Threshold Value",
    accessor: "threshold_value",
  },
  {
    header: "Message",
    accessor: "message",
  },
  {
    header: "Notification",
    accessor: "notification",
  },
  {
    type: "object",
    header: "Occurence History",
    accessor: "occurence_history",
  },
];

const AlertPolicies = () => {
  const dispatch = useAppDispatch();
  const { rows, selectedRows } = useAppSelector((state) => state.alertPolicies);

  const handleCheckbox = (index: number) => {
    if (selectedRows.includes(index)) {
      dispatch(setSelectedRows(selectedRows.filter((row) => row !== index)));
    } else {
      dispatch(setSelectedRows([...selectedRows, index]));
    }
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));

  const transformData = () => {
    return rows.map((row: TableRow) => {
      return {
        rule_template: row.rule_template,
        trigger: row.trigger,
        data_source: row.data_source,
        threshold_value: row.threshold_value,
        message: row.message,
        notification: row.notification,
        occurence_history: <ThumbnailChart />,
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
              onClick={() => dispatch(setOpenModal("addAlertPolicyForm"))}
            >
              Add New Alert Policy
            </Button>
          </div>

          <div className="hidden">
            <Modal identifier="addAlertPolicyForm">
              <AddAlertPolicyForm />
            </Modal>
          </div>
        </div>

        <Table
          headers={headers}
          rows={transformData()}
          menu={AlertPoliciesMenu}
          selectedRows={selectedRows}
          handleCheckbox={handleCheckbox}
        />
      </div>
    </div>
  );
};

export default AlertPolicies;
