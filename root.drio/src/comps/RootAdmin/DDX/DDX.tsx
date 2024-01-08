import { useEffect } from "react";
import Table from "@/comps/ui/Table";
import { faker } from "@faker-js/faker";

import {
  setRows,
  setSelectedRows,
  setCurrentDDXCluster,
} from "@/state/slices/DDXSlice";

import AddDDXForm from "./AddDDXForm";
import DDXMenu from "@/comps/RootAdmin/DDX/DDXMenu";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Modal from "@/comps/ui/Modal";
import Button from "@/comps/ui/Button";
import { IoRefresh } from "react-icons/io5";
import { HiMinusSm, HiPlus } from "react-icons/hi";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setOpenModal } from "@/state/slices/uiSlice";

import TokenPopup from "./TokenPopup";
import DDXInstances from "./DDXInstances";
import { mergedDDXData } from "@/functions/mergeDDXData";

const headers = [
  {
    header: "DDX Cluster Name",
    accessor: "name",
  },
  {
    header: "Organization Unit",
    accessor: "ou",
  },
  {
    header: "Location",
    accessor: "location",
  },
  {
    header: "Instances",
    accessor: "instances",
  },
  {
    header: "Status",
    accessor: "status",
    status: {
      active: "bg-green-100 text-green-800 px-2 py-1 font-medium rounded",
      inactive: "bg-gray-100 text-gray-800 px-2 py-1 font-medium rounded",
    },
  },
  {
    header: "Infra Provider",
    accessor: "infraProvider",
  },
  {
    header: "DDX Version",
    accessor: "ddxVersion",
  },
];

const DDX = () => {
  const dispatch = useAppDispatch();
  const DDXState = useAppSelector((state) => state.DDX);
  const { recursiveRows } = useAppSelector((state) => state.orgUnit);

  useEffect(() => {
    dispatch(setRows(mergedDDXData()));
  }, [dispatch, recursiveRows]);

  const handleCheckbox = (index: number) => {
    if (DDXState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(DDXState.selectedRows.filter((row) => row !== index))
      );
    } else {
      dispatch(setSelectedRows([...DDXState.selectedRows, index]));
    }
  };

  const handleRowClick = (row: TableRow) => {
    dispatch(setCurrentDDXCluster(row));
    dispatch(setOpenModal("ddxInstanceTable"));
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));

  const transformedRows = DDXState.rows.map((row) => ({
    ...row,
    ddxVersion: "1.0.2.03232023",
    instances: (row.ddx_instances && row.ddx_instances.length) || 0,
    infraProvider: faker.helpers.arrayElement(["AWS", "Azure", "Data Center"]),
  }));

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div
          className={`rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between`}
        >
          {DDXState.selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={DDXState.selectedRows.length > 0}
                onCheckedChange={() => clearSelectedRows?.()}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {DDXState.selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}

          <div className="flex gap-4 ml-auto">
            <Button
              icon={<HiPlus />}
              intent={"primary"}
              onClick={() => dispatch(setOpenModal("addDDXForm"))}
            >
              Add DDX Cluster
            </Button>
          </div>

          <div className="hidden">
            <Modal identifier="addDDXForm">
              <AddDDXForm />
            </Modal>
          </div>

          <div className="hidden">
            <Modal identifier="tokenPopup">
              <TokenPopup />
            </Modal>
          </div>

          <div className="hidden">
            <Modal identifier="ddxInstanceTable">
              <DDXInstances />
            </Modal>
          </div>
        </div>

        <Table
          menu={DDXMenu}
          headers={headers}
          rows={transformedRows}
          handleCheckbox={handleCheckbox}
          handleRowClick={handleRowClick}
          selectedRows={DDXState.selectedRows}
        />
      </div>
    </div>
  );
};

export default DDX;
