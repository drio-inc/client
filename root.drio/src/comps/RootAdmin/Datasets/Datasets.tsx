import Table from "@/comps/ui/Table";
import { setSelectedRows } from "@/state/slices/datasetSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import DatasetDetails from "./DatasetDetails";
import EditDatasetForm from "./EditDatasetForm";
import PublishDatasetForm from "./PublishDatasetForm";

import DatasetMenu from "./DatasetMenu/DatasetMenu";
import AddDataSourceForm from "../DataSources/AddDatasetForm/AddDatasourceForm";

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
    header: "Public",
    accessor: "public",
    status: {
      Private: "bg-green-100 text-green-800 px-2 py-1 font-medium rounded",
      Exported: "bg-cyan-100 text-cyan-800 px-2 py-1 font-medium rounded",
      Contract: "bg-yellow-100 text-yellow-800 px-2 py-1 font-medium rounded",
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
    <div className="py-6">
      <Table
        menu={DatasetMenu}
        headers={headers}
        rows={datasetState.rows}
        editForm={EditDatasetForm}
        addForm={AddDataSourceForm}
        detailsWindow={DatasetDetails}
        primaryButton="Publish New Dataset"
        secondaryButton="Add New Data Source"
        modalIdentifier="publishDatasetForm"
        modalIdentifier2="addDataSourceForm"
        clearSelectedRows={clearSelectedRows}
        handleRowSelection={handleRowSelection}
        selectedRows={datasetState.selectedRows}
      />
    </div>
  );
};

export default Dataset;
