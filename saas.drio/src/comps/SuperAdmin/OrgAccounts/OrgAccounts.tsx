import Table from "@/comps/ui/Table";

import { setSelectedRows } from "@/state/slices/adminOrgAccountSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import OrgAccountMenu from "./OrgAccountMenu";
import AddOrgAccountForm from "./AddOrgAccountForm";
import EditOrgAccountForm from "./EditOrgAccountForm";

const headers = [
  {
    header: "Organizational Units",
    accessor: "ou",
  },
  {
    header: "Authentication",
    accessor: "authentication",
  },

  {
    header: "Datasets Published",
    accessor: "datasetsPublished",
  },
  {
    header: "Public Contract Datasets",
    accessor: "publicContractDatasets",
  },
  {
    header: "Daily Usage Frequency",
    accessor: "dailyUsageFrequency",
  },
  {
    header: "Alert ( 7 days)",
    accessor: "alert",
  },
];

const OrgAccounts = () => {
  const dispatch = useAppDispatch();
  const adminOrgAccountState = useAppSelector((state) => state.adminOrgAccount);

  const handleRowSelection = (index: number) => {
    if (adminOrgAccountState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          adminOrgAccountState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...adminOrgAccountState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="py-6">
      <Table
        headers={headers}
        menu={OrgAccountMenu}
        addForm={AddOrgAccountForm}
        editForm={EditOrgAccountForm}
        rows={adminOrgAccountState.rows}
        clearSelectedRows={clearSelectedRows}
        handleRowSelection={handleRowSelection}
        primaryButton="Add New Organization Unit"
        selectedRows={adminOrgAccountState.selectedRows}
      />
    </div>
  );
};

export default OrgAccounts;
