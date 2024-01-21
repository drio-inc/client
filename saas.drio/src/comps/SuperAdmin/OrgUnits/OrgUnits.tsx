import Table from "@/comps/ui/Table";
import { faker } from "@faker-js/faker";
import { setSelectedRows } from "@/state/slices/orgUnitSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import OrgUnitMenu from "./OrgUnitMenu";
import AddOrgUnitForm from "./AddOrgUnitForm";

import { useEffect } from "react";
import { IoRefresh } from "react-icons/io5";
import { setRows } from "@/state/slices/orgUnitSlice";
import { HiMinusSm, HiPlus, HiX } from "react-icons/hi";

import Button from "@ui/Button";
import Modal from "@/comps/ui/Modal";
import * as Checkbox from "@radix-ui/react-checkbox";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

import { useAccounts } from "@/hooks/useAccounts";
import { useGetOrgUnitsQuery } from "@/api/resources/accounts/ous";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

type OrgUnitProps = {
  modal?: boolean;
  accountId?: string;
};

const headers = [
  {
    header: "Organization Unit",
    accessor: "name",
  },
  {
    header: "Location",
    accessor: "location",
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
    header: "Daily Usage Frequency",
    accessor: "dailyUsageFrequency",
  },
  {
    header: "Alert ( 7 days)",
    accessor: "alerts",
  },
];

const OrgUnits = ({ modal = false, accountId }: OrgUnitProps) => {
  const dispatch = useAppDispatch();
  const orgUnitState = useAppSelector((state) => state.orgUnit);
  const { data, isLoading } = useGetOrgUnitsQuery(accountId ?? "");
  const { rows: accountRows, isLoading: isAccountsLoading } = useAccounts();

  useEffect(() => {
    if (process.env.DEVELOPMENT_MODE !== "mock") {
      dispatch(setRows(data));
    }
  }, [data, dispatch]);

  const handleCheckbox = (index: number) => {
    if (orgUnitState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          orgUnitState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...orgUnitState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));

  if (isLoading) return <StaticLoader />;

  const transformedData = accountRows?.reduce((acc: TableRow[], curr) => {
    const orgUnits =
      (curr?.organization_units &&
        curr?.organization_units?.map((ou) => {
          return {
            ...ou,
            location: `${ou.city}, ${ou.state}, ${ou.country}`,
            alerts: faker.number.int({ min: 0, max: 7 }),
            contracts: faker.number.int({ min: 5, max: 20 }),
            datasetsPublished: faker.number.int({ min: 5, max: 30 }),
            dailyUsageFrequency: faker.number.int({ min: 10, max: 400 }),
          };
        })) ||
      [];

    return [...acc, ...orgUnits];
  }, []);

  return (
    <div className={`${!modal ? `py-2 w-full` : `xl:w-[64vw]`}`}>
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div
          className={`rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between`}
        >
          {orgUnitState.selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={orgUnitState.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {orgUnitState.selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}

          <div className="flex items-center gap-4 ml-auto">
            <Button
              icon={<HiPlus />}
              intent={"primary"}
              onClick={() => {
                dispatch(setCloseModal("orgUnitTable"));
                dispatch(setOpenModal("addOrgUnitForm"));
              }}
            >
              Add Organization Unit
            </Button>

            {modal && (
              <span>
                <HiX
                  className="w-8 h-8 cursor-pointer hover:text-drio-red-dark transition-all duration-200"
                  onClick={() => dispatch(setCloseModal("orgUnitTable"))}
                />
              </span>
            )}
          </div>

          <div className="hidden">
            <Modal identifier="addOrgUnitForm">
              <AddOrgUnitForm />
            </Modal>
          </div>
        </div>

        <Table
          headers={headers}
          menu={OrgUnitMenu}
          handleCheckbox={handleCheckbox}
          selectedRows={orgUnitState.selectedRows}
          rows={
            !modal
              ? transformedData
              : data?.map((row) => {
                  return {
                    ...row,
                    location: ` ${row.city}, ${row.state}, ${row.country}`,
                    alerts: faker.number.int({ min: 0, max: 7 }),
                    contracts: faker.number.int({ min: 5, max: 20 }),
                    datasetsPublished: faker.number.int({ min: 5, max: 30 }),
                    dailyUsageFrequency: faker.number.int({
                      min: 10,
                      max: 400,
                    }),
                  };
                })
          }
        />
      </div>
    </div>
  );
};

export default OrgUnits;
