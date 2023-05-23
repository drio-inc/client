import Table from "@/comps/ui/Table";
import AccountDetails from "./AccountDetals";
import EditAccountForm from "./EditAccountForm";
import AddAccountForm from "./AddAccountForm/AddAccountForm";
import { setSelectedRows } from "@/state/slices/adminAccountSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import AccountMenu from "./AccountMenu";

const headers = [
  {
    header: "Account",
    accessor: "account",
  },
  {
    header: "Organizational Units",
    accessor: "ous",
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
    accessor: "alerts",
  },
];

const Accounts = () => {
  const dispatch = useAppDispatch();
  const adminAccountState = useAppSelector((state) => state.adminAccount);

  const handleRowSelection = (index: number) => {
    if (adminAccountState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          adminAccountState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...adminAccountState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="py-6">
      <Table
        headers={headers}
        menu={AccountMenu}
        addForm={AddAccountForm}
        editForm={EditAccountForm}
        detailsWindow={AccountDetails}
        rows={adminAccountState.rows}
        primaryButton="Add New Account"
        clearSelectedRows={clearSelectedRows}
        handleRowSelection={handleRowSelection}
        selectedRows={adminAccountState.selectedRows}
      />
    </div>
  );
};

export default Accounts;
