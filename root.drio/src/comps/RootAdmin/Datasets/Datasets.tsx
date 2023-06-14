import Table from "@/comps/ui/Table";
import { setSelectedRows } from "@/state/slices/datasetSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import DatasetDetails from "./DatasetDetails";
import EditDatasetForm from "./EditDatasetForm";
import PublishDatasetForm from "./PublishDatasetForm";

import DatasetMenu from "./DatasetMenu/DatasetMenu";
import AddDataSourceForm from "../DataSources/AddDataSourceForm";

import Button from "@ui/Button";
import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setOpenModal } from "@/state/slices/uiSlice";
import { HiMinusSm, HiUpload, HiPlus } from "react-icons/hi";

import TopOrgs from "./TopOrgs";
import Modal from "@/comps/ui/Modal";

const headers = [
  {
    header: "Dataset",
    accessor: "dataset",
  },
  {
    header: "Organization Unit",
    accessor: "ou",
  },

  {
    header: "Visibility",
    accessor: "visibility",
    status: {
      Private: "bg-green-100 text-green-800 px-2 py-1 font-medium rounded",
      Public: "bg-cyan-100 text-cyan-800 px-2 py-1 font-medium rounded",
      Contractual:
        "bg-yellow-100 text-yellow-800 px-2 py-1 font-medium rounded",
    },
  },

  {
    header: "Contract in Place",
    accessor: "contractInPlace",
    status: {
      Yes: "bg-green-100 text-green-800 px-2 py-1 font-medium rounded",
      "In-Progress":
        "bg-yellow-100 text-yellow-800 px-2 py-1 font-medium rounded",
      No: "bg-red-100 text-red-800 px-2 py-1 font-medium rounded",
    },
  },

  {
    header: "6 Months Access",
    accessor: "sixMonthsAccess",
  },
  {
    header: "Daily Usage Frequency",
    accessor: "frequency",
  },
  {
    header: "Alerts (7 days)",
    accessor: "alerts",
  },
];

const Dataset = () => {
  const dispatch = useAppDispatch();
  const datasetState = useAppSelector((state) => state.dataset);

  const handleRowSelection = (index: number) => {
    if (datasetState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          datasetState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...datasetState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="py-2 w-full">
      <span className="text-sm text-gray-500 inline-block px-4 py-2 my-2 bg-white rounded-md border">
        Top 10 Organisations Accessing Data
      </span>

      <TopOrgs />

      <span className="text-xs text-gray-900 inline-block px-4 py-2 mt-2 mb-6 bg-white rounded-md border">
        Top by Access Frequency
      </span>

      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div
          className={`rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between`}
        >
          {datasetState.selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={datasetState.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {datasetState.selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}

          <div className="flex gap-4 ml-auto">
            <Button
              intent={"primary"}
              onClick={() => dispatch(setOpenModal("publishDatasetForm"))}
            >
              <div className="flex items-center gap-1">
                <HiUpload />
                <span className="inline-block">Publish Dataset</span>
              </div>
            </Button>
          </div>

          {/* <div className="hidden"> */}
          <Modal identifier="addDataSourceForm">
            <AddDataSourceForm />
          </Modal>

          <Modal identifier="publishDatasetForm">
            <PublishDatasetForm />
          </Modal>
          {/* </div> */}
        </div>

        <Table
          headers={headers}
          menu={DatasetMenu}
          rows={datasetState.rows}
          editForm={EditDatasetForm}
          detailsWindow={DatasetDetails}
          handleRowSelection={handleRowSelection}
          selectedRows={datasetState.selectedRows}
        />
      </div>
    </div>
  );
};

export default Dataset;
