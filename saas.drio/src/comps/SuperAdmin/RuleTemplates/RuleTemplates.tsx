import Table from "@/comps/ui/Table";
import { setSelectedRows } from "@/state/slices/ruleTemplateSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Button from "@ui/Button";
import Modal from "@/comps/ui/Modal";
import { IoRefresh } from "react-icons/io5";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import RuleTemplatesMenu from "./RuleTemplatesMenu";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setOpenModal } from "@/state/slices/uiSlice";
import AddNewRuleTemplateForm from "./AddNewRuleTemplateForm";

const headers = [
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Description",
    accessor: "description",
  },
  {
    header: "Times Queried",
    accessor: "times_queried",
  },

  {
    header: "Times Used",
    accessor: "times_used",
  },
  {
    header: "Number of Streams",
    accessor: "number_of_streams",
  },
  {
    header: "Number of Fields",
    accessor: "number_of_fields",
  },
  {
    header: "Enabled",
    accessor: "enabled",
  },
];

const RuleTemplates = () => {
  const dispatch = useAppDispatch();
  const ruleTemplateState = useAppSelector((state) => state.ruleTemplate);

  const handleCheckbox = (index: number) => {
    if (ruleTemplateState.selectedRows.includes(index)) {
      dispatch(setSelectedRows(ruleTemplateState.selectedRows.filter((row) => row !== index)));
    } else {
      dispatch(setSelectedRows([...ruleTemplateState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="py-2 w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div className="rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between">
          {ruleTemplateState.selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={ruleTemplateState.selectedRows.length > 0}
                onCheckedChange={() => clearSelectedRows?.()}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {ruleTemplateState.selectedRows.length} Item(s) Selected
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
              onClick={() => dispatch(setOpenModal("addNewRuleTemplateForm"))}
            >
              Add New Rule Template
            </Button>
          </div>

          <div className="hidden">
            <Modal identifier="addNewRuleTemplateForm">
              <AddNewRuleTemplateForm />
            </Modal>
          </div>
        </div>

        <Table
          headers={headers}
          menu={RuleTemplatesMenu}
          rows={ruleTemplateState.rows}
          handleCheckbox={handleCheckbox}
          selectedRows={ruleTemplateState.selectedRows}
        />
      </div>
    </div>
  );
};

export default RuleTemplates;
