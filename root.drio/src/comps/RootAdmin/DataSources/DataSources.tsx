import Table from "@/comps/ui/Table";
import { setSelectedRows } from "@/state/slices/dataSourceSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import EditDataSourceForm from "./EditDataSourceForm";
import AddDataSourceForm from "./AddDataSourceForm";

import DataSourcesMenu from "./DataSourcesMenu/DataSourcesMenu";

import Button from "@ui/Button";
import { IoRefresh } from "react-icons/io5";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setOpenModal } from "@/state/slices/uiSlice";

import Modal from "@/comps/ui/Modal";

const headers = [
  {
    header: "Source Name",
    accessor: "sourceName",
  },
  {
    header: "Type",
    accessor: "type",
  },

  {
    header: "Broker Endpoint",
    accessor: "endpoint",
  },

  {
    header: "# Datasets",
    accessor: "datasets",
  },

  {
    header: "Schema Registry",
    accessor: "schemaRegistry",
  },
  {
    header: "Metadata Management",
    accessor: "metadataManagement",
  },
  {
    header: "API Documentation",
    accessor: "apiDocumentation",
  },
];

const DataSources = () => {
  const dispatch = useAppDispatch();
  const dataSourceState = useAppSelector((state) => state.dataSource);

  const handleCheckbox = (index: number) => {
    if (dataSourceState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          dataSourceState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...dataSourceState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div
          className={`rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between`}
        >
          {dataSourceState.selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={dataSourceState.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {dataSourceState.selectedRows.length} Item(s) Selected
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
        </div>

        <Table
          headers={headers}
          menu={DataSourcesMenu}
          rows={dataSourceState.rows}
          editForm={EditDataSourceForm}
          handleCheckbox={handleCheckbox}
          selectedRows={dataSourceState.selectedRows}
        />
      </div>
    </div>
  );
};

export default DataSources;
