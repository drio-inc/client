import Table from "@/comps/ui/Table";

import { setSelectedRows } from "@/state/slices/orgUnitSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import OrgAccountMenu from "./OrgUnitMenu";
import AddOrgAccountForm from "./AddOrgUnitForm";
import EditOrgAccountForm from "./EditOrgUnitForm";

import Button from "@ui/Button";
import Modal from "@/comps/ui/Modal";
import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setRows } from "@/state/slices/orgUnitSlice";
import { HiMinusSm, HiPlus, HiX } from "react-icons/hi";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { useGetOrganizationUnitsQuery } from "@/api/resources/accounts/ous";

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
    accessor: "dsPublished",
  },
  {
    header: "Public Contract Datasets",
    accessor: "contract",
  },
  {
    header: "Daily Usage Frequency",
    accessor: "frequency",
  },
  {
    header: "Alert ( 7 days)",
    accessor: "alerts",
  },
];

const OrgUnits = ({
  modal = false,
  accountId,
}: {
  modal?: boolean;
  accountId?: string;
}) => {
  const dispatch = useAppDispatch();
  const orgUnitState = useAppSelector((state) => state.orgUnit);
  const { data, error, isLoading } = useGetOrganizationUnitsQuery(
    accountId ?? ""
  );

  if (isLoading) return <StaticLoader />;

  if (data) dispatch(setRows(data));

  console.log(data);

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

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className={`${!modal && `py-2`} w-full`}>
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
              <AddOrgAccountForm />
            </Modal>
          </div>
        </div>

        <Table
          headers={headers}
          menu={OrgAccountMenu}
          editForm={EditOrgAccountForm}
          handleCheckbox={handleCheckbox}
          selectedRows={orgUnitState.selectedRows}
          rows={orgUnitState.rows.map((row) => {
            return {
              ...row,
              location: ` ${row.city}, ${row.state}, ${row.country}`,
            };
          })}
        />
      </div>
    </div>
  );
};

export default OrgUnits;
