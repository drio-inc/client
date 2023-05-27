import Table from "@/comps/ui/Table";
import { setSelectedRows } from "@/state/slices/DDXSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import DDXDetails from "./DDXDetails/DDXDetails";
import UpdateLicenseForm from "./UpdateLicenseForm";
import AddDDXForm from "./AddDDXForm/AddDDXForm";

import DDXMenu from "@/comps/RootAdmin/DDX/DDXMenu";

const headers = [
  {
    header: "Account Name",
    accessor: "account",
  },
  {
    header: "Organization Unit",
    accessor: "ou",
  },
  {
    header: "Status",
    accessor: "status",
    status: {
      Active: "bg-green-100 text-green-800 px-2 py-1 font-medium rounded",
      Pending: "bg-yellow-100 text-yellow-800 px-2 py-1 font-medium rounded",
      "Not Configured": "bg-red-100 text-red-800 px-2 py-1 font-medium rounded",
    },
  },

  {
    header: "Cluster #VCPU",
    accessor: "clusterVCPU",
  },
  {
    header: "Cluster Memory",
    accessor: "clusterMemory",
  },
  {
    header: "Cluster Storage",
    accessor: "clusterStorage",
  },
  {
    header: "Infra Provider",
    accessor: "infraProvider",
  },
  {
    header: "Country",
    accessor: "country",
  },
  {
    header: "SW Version",
    accessor: "swVersion",
  },
];

const DDX = () => {
  const dispatch = useAppDispatch();
  const DDXState = useAppSelector((state) => state.DDX);

  const handleRowSelection = (index: number) => {
    if (DDXState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(DDXState.selectedRows.filter((row) => row !== index))
      );
    } else {
      dispatch(setSelectedRows([...DDXState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="py-6">
      <Table
        menu={DDXMenu}
        headers={headers}
        rows={DDXState.rows}
        addForm={AddDDXForm}
        primaryButton="Add DDX"
        modalIdentifier="addDDXForm"
        detailsWindow={DDXDetails}
        editForm={UpdateLicenseForm}
        clearSelectedRows={clearSelectedRows}
        handleRowSelection={handleRowSelection}
        selectedRows={DDXState.selectedRows}
      />
    </div>
  );
};

export default DDX;
