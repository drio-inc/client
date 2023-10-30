import Table from "@/comps/ui/Table";
import { setSelectedRows } from "@/state/slices/subscribeDatasetsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import DatasetDetails from "./DatasetDetails";
import EditDatasetForm from "./RequestDataAccessForm";

import SubscribeDatasetMenu from "./SubscribeDatasetMenu/SubscribeDatasetMenu";

import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";
import {
  HiMinusSm,
  HiOutlineFilter,
  HiOutlineViewBoards,
} from "react-icons/hi";

import TopOrgs from "../TopOrgs";
import { useState } from "react";
import Categories from "./Categories";
import { StatelessSelectInput } from "@/comps/ui/Forms/Inputs/Inputs";

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
    header: "Visibility",
    accessor: "visibility",
    status: {
      Private: "bg-green-100 text-green-800 px-2 py-1 font-medium rounded",
      Public: "bg-cyan-100 text-cyan-800 px-2 py-1 font-medium rounded",
      Contractual:
        "bg-yellow-100 text-yellow-800 px-2 py-1 font-medium rounded",
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
  const [tab, setTab] = useState("organizations");
  const subscribeDatasets = useAppSelector((state) => state.subscribeDataset);

  const handleCheckbox = (index: number) => {
    if (subscribeDatasets.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          subscribeDatasets.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...subscribeDatasets.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => {
    dispatch(setSelectedRows([]));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col text-2xl text-gray-900 font-medium p-6 mb-6 bg-white rounded-md border">
        <span>Top 10 Organizations Accessing Data</span>
        <TopOrgs />
      </div>

      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div className="flex justify-between my-2 bg-white px-4 py-2">
          <div className="flex flex-wrap gap-x-2 items-center text-gray-500">
            <span className="inline-block mr-4">Sort by:</span>
            <button
              className={`px-4 py-2 rounded-lg hover:bg-gray-200 ${
                tab === "organizations" && "bg-gray-200 text-gray-900"
              }`}
              onClick={() => setTab("organizations")}
            >
              Organizations
            </button>
            <button
              className={`px-4 py-2 rounded-lg hover:bg-gray-200 ${
                tab === "categories" && "bg-gray-200 text-gray-900"
              }`}
              onClick={() => setTab("categories")}
            >
              Category
            </button>
          </div>

          <div className="flex gap-x-6">
            <div className="flex items-center gap-x-2 w-full">
              <span className="inline-block p-2 bg-blue-100 rounded border">
                <HiOutlineViewBoards className="text-drio-red" />
              </span>

              <StatelessSelectInput
                label=""
                registerName="view"
                options={[
                  { label: "Subscribed", value: "subscribed" },
                  { label: "Not Subscribed", value: "notSubscribed" },
                ]}
              />
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <span className="inline-block p-2 bg-blue-100 rounded border">
                <HiOutlineFilter className="text-drio-red" />
              </span>

              <StatelessSelectInput
                label=""
                registerName="view"
                options={[
                  { label: "List", value: "list" },
                  { label: "Table", value: "table" },
                ]}
              />
            </div>
          </div>
        </div>
        <div
          className={` bg-gray-50 flex flex-wrap items-center justify-between`}
        >
          {subscribeDatasets.selectedRows.length > 0 && (
            <div className="flex items-center px-4 py-4">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-primary-500 outline-none data-[state=unchecked]:border border-gray-300"
                checked={subscribeDatasets.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {subscribeDatasets.selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}
        </div>

        {tab === "organizations" ? (
          <Table
            headers={headers}
            menu={SubscribeDatasetMenu}
            rows={subscribeDatasets.rows}
            handleCheckbox={handleCheckbox}
            selectedRows={subscribeDatasets.selectedRows}
          />
        ) : (
          <Categories />
        )}
      </div>
    </div>
  );
};

export default Dataset;
