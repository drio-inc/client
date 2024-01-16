import Table from "@/comps/ui/Table";
import AddDataSourceForm from "./AddDataSourceForm";
import DataSourcesMenu from "./DataSourcesMenu/DataSourcesMenu";
import { setRows as setDDXRows } from "@/state/slices/DDXSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRows } from "@/state/slices/dataSourceSlice";

import Button from "@ui/Button";
import { IoRefresh } from "react-icons/io5";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setOpenModal } from "@/state/slices/uiSlice";

import { useEffect } from "react";
import Modal from "@/comps/ui/Modal";
import DataSourcePopup from "./DataSourcePopup";
import { mergedDDXData } from "@/functions/mergeDDXData";
import { mergedDataSourceData } from "@/functions/mergeDataSources";

const headers = [
  {
    header: "Name",
    accessor: "name",
  },

  {
    header: "Organization Unit",
    accessor: "ou",
  },

  {
    header: "Kind",
    accessor: "kind",
  },

  {
    header: "Broker Endpoint",
    accessor: "endpoints",
  },

  {
    header: "#Datasets",
    accessor: "datasets",
  },

  {
    header: "Schema Registry",
    accessor: "schema_endpoints",
  },
  {
    header: "Catalog Management",
    accessor: "metadata_endpoints",
  },
  {
    header: "Documentation",
    accessor: "documentation",
  },
];

const DataSources = () => {
  const dispatch = useAppDispatch();
  const { recursiveRows } = useAppSelector((state) => state.orgUnit);
  const { selectedRows, rows } = useAppSelector((state) => state.dataSource);

  useEffect(() => {
    dispatch(setDDXRows(mergedDDXData()));
    dispatch(setRows(mergedDataSourceData()));
  }, [dispatch, recursiveRows]);

  const handleCheckbox = (index: number) => {
    if (selectedRows.includes(index)) {
      dispatch(setSelectedRows(selectedRows.filter((row) => row !== index)));
    } else {
      dispatch(setSelectedRows([...selectedRows, index]));
    }
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));

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
              onClick={() => dispatch(setOpenModal("addDataSourceForm"))}
            >
              Add New Data Source
            </Button>
          </div>

          <div className="hidden">
            <Modal identifier="addDataSourceForm">
              <AddDataSourceForm />
            </Modal>
          </div>

          <div className="hidden">
            <Modal identifier="dataSourcePopup">
              <DataSourcePopup />
            </Modal>
          </div>
        </div>

        <Table
          rows={rows}
          headers={headers}
          menu={DataSourcesMenu}
          selectedRows={selectedRows}
          handleCheckbox={handleCheckbox}
        />
      </div>
    </div>
  );
};

export default DataSources;
