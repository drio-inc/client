import Table from "@/comps/ui/Table";

import { setSelectedRows } from "@/state/slices/orgUnitSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import OrgUnitMenu from "./OrgUnitMenu";
import AddOrgUnitForm from "./AddOrgUnitForm";

import { IoRefresh } from "react-icons/io5";
import { HiMinusSm, HiPlus } from "react-icons/hi";

import Button from "@ui/Button";
import Modal from "@/comps/ui/Modal";
import * as Checkbox from "@radix-ui/react-checkbox";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

import { useGetOrgUnitsQuery } from "@/api/resources/ous";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { faker } from "@faker-js/faker";

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

const OrgUnits = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const orgUnitState = useAppSelector((state) => state.orgUnit);
  const { data, isLoading } = useGetOrgUnitsQuery(user?.account_id ?? "");

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

  const transformData = () =>
    data?.map((row) => ({
      ...row,
      alerts: faker.number.int({ min: 0, max: 7 }),
      contracts: faker.number.int({ min: 5, max: 20 }),
      location: ` ${row.city}, ${row.state}, ${row.country}`,
      datasetsPublished: faker.number.int({ min: 5, max: 30 }),
      dailyUsageFrequency: faker.number.int({ min: 10, max: 400 }),
    }));

  return (
    <div className={`w-full`}>
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
          rows={transformData()}
          handleCheckbox={handleCheckbox}
          selectedRows={orgUnitState.selectedRows}
        />
      </div>
    </div>
  );
};

export default OrgUnits;
