import Table from "@/comps/ui/Table";
import AccountDetails from "./AccountDetails";
import EditAccountForm from "./EditAccountForm";
import AddAccountForm from "./AddAccountForm/AddAccountForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRows } from "@/state/slices/accountSlice";

import AccountMenu from "./AccountMenu";

import Button from "@ui/Button";
import Modal from "@/comps/ui/Modal";
import OrgAccounts from "../OrgAccounts";
import { IoRefresh } from "react-icons/io5";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setOpenModal } from "@/state/slices/uiSlice";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { useGetAccountsQuery } from "@/api/resources/accounts";

const headers = [
  {
    header: "Account",
    accessor: "name",
  },
  {
    header: "Organization Units",
    accessor: "organization_units",
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
  const accountState = useAppSelector((state) => state.account);

  const { data, isLoading } = useGetAccountsQuery();

  if (isLoading) return <StaticLoader />;

  if (data) dispatch(setRows(data));

  const handleCheckbox = (index: number) => {
    if (accountState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          accountState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...accountState.selectedRows, index]));
    }
  };

  const handleRowClick = (index: number) => {
    dispatch(setOpenModal("orgAccountTable"));
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="py-2 w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div
          className={`rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between`}
        >
          {accountState.selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={accountState.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {accountState.selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}

          <div className="flex gap-4 ml-auto">
            <Button
              role="addButton"
              icon={<HiPlus />}
              intent={"primary"}
              onClick={() => dispatch(setOpenModal("addAccountForm"))}
            >
              Add New Account
            </Button>
          </div>

          <div className="hidden">
            <Modal identifier="addAccountForm">
              <AddAccountForm />
            </Modal>

            <Modal identifier="orgAccountTable">
              <OrgAccounts modal={true} />
            </Modal>
          </div>
        </div>

        <Table
          headers={headers}
          menu={AccountMenu}
          editForm={EditAccountForm}
          detailsWindow={AccountDetails}
          handleCheckbox={handleCheckbox}
          handleRowClick={handleRowClick}
          selectedRows={accountState.selectedRows}
          rows={accountState.rows.map((row: any) => {
            return {
              ...row,
              organization_units: row.organization_units ?? 0,
            };
          })}
        />
      </div>
    </div>
  );
};

export default Accounts;
