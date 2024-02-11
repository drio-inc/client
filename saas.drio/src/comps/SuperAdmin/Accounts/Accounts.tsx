import Table from "@/comps/ui/Table";
import AddAccountForm from "./AddAccountForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import {
  setRows,
  setAccountId,
  setSelectedRows,
} from "@/state/slices/accountSlice";

import Button from "@ui/Button";
import { useEffect } from "react";
import OrgUnits from "../OrgUnits";
import Modal from "@/comps/ui/Modal";
import AccountMenu from "./AccountMenu";
import { IoRefresh } from "react-icons/io5";
import getAccounts from "@/functions/getAccounts";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import * as Checkbox from "@radix-ui/react-checkbox";
import DeleteOrgUnit from "../OrgUnits/DeleteOrgUnit";
import { setOpenModal } from "@/state/slices/uiSlice";
import AddOrgUnitForm from "../OrgUnits/AddOrgUnitForm";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import EditOrgUnitForm from "../OrgUnits/EditOrgUnitForm";
import { useGetAccountsQuery } from "@/api/resources/accounts";

const INDICES_TO_CHANGE = [4, 5];

const headers = [
  {
    header: "Account",
    accessor: "name",
  },

  {
    header: "OUs",
    accessor: "organization_units",
  },

  {
    header: "Users",
    accessor: "users",
  },

  {
    header: "DDX Clusters",
    accessor: "ddxClusters",
  },

  {
    header: "Status",
    accessor: "status",
    status: {
      Active: "bg-green-100 text-green-800 px-2 py-1 font-medium rounded",
      Inactive: "bg-gray-100 text-gray-800 px-2 py-1 font-medium rounded",
      Onboarding: "bg-yellow-100 text-yellow-800 px-2 py-1 font-medium rounded",
    },
  },

  {
    header: "Datasets Published",
    accessor: "datasetsPublished",
  },
  {
    header: "Contracts",
    accessor: "contracts",
  },
  {
    header: "Access Frequency",
    accessor: "accessFrequency",
  },
  {
    header: "Alert ( 7 days)",
    accessor: "alerts",
  },
];

const Accounts = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetAccountsQuery();
  const accountState = useAppSelector((state) => state.account);

  useEffect(() => {
    if (process.env.DEVELOPMENT_MODE !== "mock") {
      if (!isLoading && data) {
        const accountIds = data.map((account: TableRow) => account.id);
        getAccounts(accountIds).then((res) => {
          dispatch(setRows(res));
        });
      }
    }
  }, [data, dispatch, isLoading]);

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

  const handleRowClick = (id: string) => {
    dispatch(setAccountId(id));
    dispatch(setOpenModal("orgUnitTable"));
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));

  if (isLoading && !accountState.rows.length) return <StaticLoader />;

  const transformData = () => {
    return accountState.rows?.map((row, index) => {
      const ddxClusters = row.organization_units
        .map((unit) => (unit.ddx_clusters && unit.ddx_clusters.length) || 0)
        .reduce((a, b) => a + b, 0);

      return {
        ...row,
        ddxClusters,
        users: row.users.length,
        alerts: Math.round(Math.random() * 7),
        contracts: Math.round(Math.random() * 20),
        datasetsPublished: Math.round(Math.random() * 30),
        organization_units: row.organization_units.length,
        accessFrequency: `${Math.round(Math.random() * 400)} / day`,
        status: INDICES_TO_CHANGE.includes(index) ? "Onboarding" : "Active",
      };
    });
  };

  return (
    <div className="w-full">
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

            <Modal identifier="orgUnitTable">
              <OrgUnits accountId={accountState.accountId ?? ""} />
            </Modal>
          </div>
        </div>

        <div className="hidden">
          <Modal identifier="addOrgUnitForm">
            <AddOrgUnitForm />
          </Modal>
        </div>

        <div className="hidden">
          <Modal identifier="editOrgUnitForm">
            <EditOrgUnitForm />
          </Modal>
        </div>

        <div className="hidden">
          <Modal identifier="deleteOrgUnit">
            <DeleteOrgUnit />
          </Modal>
        </div>

        <Table
          headers={headers}
          menu={AccountMenu}
          rows={transformData()}
          handleCheckbox={handleCheckbox}
          handleRowClick={handleRowClick}
          selectedRows={accountState.selectedRows}
        />
      </div>
    </div>
  );
};

export default Accounts;
