import Modal from "@/comps/ui/Modal";
import Table from "@/comps/ui/Table";
import Button from "@/comps/ui/Button";
import { setSelectedRows } from "@/state/slices/personaSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import PersonaMenu from "./PersonaMenu";
import { HiMinusSm } from "react-icons/hi";
import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setOpenModal } from "@/state/slices/uiSlice";
import AddPersonaForm from "./AddPersonaForm";

const headers = [
  {
    header: "App Persona Name",
    accessor: "name",
  },
  {
    header: "Consuming Domain",
    accessor: "domain",
  },
  {
    header: "Contract Rule Name",
    accessor: "ruleset_name",
  },
  {
    header: "# of Datasets",
    accessor: "datasets",
  },

  {
    header: "Max # of Consumers",
    accessor: "consumers",
  },

  {
    header: "Max Daily Limit",
    accessor: "max_daily_limit",
  },

  {
    header: "Max Rate Limit",
    accessor: "max_rate_limit",
  },

  {
    header: "Time Validity",
    accessor: "validity",
  },
];

const Personas = () => {
  const dispatch = useAppDispatch();
  const personaSlice = useAppSelector((state) => state.personas);

  const handleCheckbox = (index: number) => {
    if (personaSlice.selectedRows.includes(index)) {
      dispatch(setSelectedRows(personaSlice.selectedRows.filter((row) => row !== index)));
    } else {
      dispatch(setSelectedRows([...personaSlice.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div className="rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between">
          {personaSlice.selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={personaSlice.selectedRows.length > 0}
                onCheckedChange={() => clearSelectedRows?.()}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {personaSlice.selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}

          <div className="flex gap-4 ml-auto">
            <Button intent={"primary"} onClick={() => dispatch(setOpenModal("addPersonaForm"))}>
              Add New Persona
            </Button>
          </div>

          <div className="hidden">
            <Modal identifier="addPersonaForm">
              <AddPersonaForm />
            </Modal>
          </div>
        </div>

        <Table
          headers={headers}
          menu={PersonaMenu}
          rows={personaSlice.rows}
          handleCheckbox={handleCheckbox}
          selectedRows={personaSlice.selectedRows}
        />
      </div>
    </div>
  );
};

export default Personas;
