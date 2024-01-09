import Table from "@/comps/ui/Table";
import DatasetsJSON from "@/data/datasets.json";
import DatasetMenu from "./DatasetMenu/DatasetMenu";
import PublishDatasetForm from "./PublishDatasetForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import {
  setRows,
  setRawRows,
  setSelectedRows,
} from "@/state/slices/datasetSlice";

import Button from "@ui/Button";
import { IoRefresh } from "react-icons/io5";
import { HiMinusSm, HiUpload } from "react-icons/hi";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setOpenModal } from "@/state/slices/uiSlice";

import TopOrgs from "../TopOrgs";
import { useEffect } from "react";
import Modal from "@/comps/ui/Modal";

import getDatasets from "@/functions/getDatasets";
import { mergedDDXData } from "@/functions/mergeDDXData";
import { setRows as setDDXRows } from "@/state/slices/DDXSlice";
import AddDataSourceForm from "../DataSources/AddDataSourceForm";
import { mergedDataSourceData } from "@/functions/mergeDataSourcesData";
import { setRows as setDataSourceRows } from "@/state/slices/dataSourceSlice";

const headers = [
  {
    header: "Dataset",
    accessor: "name",
  },

  {
    header: "Organization Unit",
    accessor: "ou",
  },

  {
    header: "Data Source",
    accessor: "ds",
  },

  {
    header: "Visibility",
    accessor: "visibility",
    status: {
      private: "bg-green-100 text-green-800 px-2 py-1 font-medium rounded",
      public: "bg-cyan-100 text-cyan-800 px-2 py-1 font-medium rounded",
      contractual:
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
    header: "6 Months Access",
    accessor: "sixMonthsAccess",
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

const TopDatasets = [
  {
    name: "Savino Del Bene",
    logo: "/images/sdb.jpeg",
  },
  {
    name: "Gebruder Weiss",
    logo: "/images/gw.jpeg",
  },
  {
    name: "Expeditors International",
    logo: "/images/expeditors.svg",
  },
  {
    name: "UPS SCS",
    logo: "/images/ups-yellow.svg",
  },
  {
    name: "DGF",
    logo: "/images/dgf.svg",
  },
  {
    name: "DHL Express",
    logo: "/images/dhl-d.svg",
  },
  {
    name: "DHL Same Day",
    logo: "/images/dhl.svg",
  },
  {
    name: "Kintetsu",
    logo: "/images/kwe.svg",
  },
  {
    name: "Hamburg SUD",
    logo: "/images/hamburg-sud.jpeg",
  },
  {
    name: "UPS Small Parcel",
    logo: "/images/ups-yellow.svg",
  },
];

const DatasetsComp = () => {
  const dispatch = useAppDispatch();
  const { recursiveRows } = useAppSelector((state) => state.orgUnit);
  const { rows, selectedRows } = useAppSelector((state) => state.dataset);
  const { rows: dataSourceRows } = useAppSelector((state) => state.dataSource);

  useEffect(() => {
    dispatch(setDDXRows(mergedDDXData()));
    dispatch(setDataSourceRows(mergedDataSourceData()));
  }, [dispatch, recursiveRows]);

  useEffect(() => {
    const dataSourceIds = dataSourceRows.map((row) => ({
      ou_id: row.ou_id,
      datasource_id: row.id,
      account_id: row.account_id,
    }));

    getDatasets(dataSourceIds).then((payload) => {
      console.log(payload);

      dispatch(setRows([...DatasetsJSON, ...payload.data]));
      dispatch(setRawRows(payload.rawData));
    });
  }, [dataSourceRows, dispatch]);

  const handleCheckbox = (index: number) => {
    if (selectedRows.includes(index)) {
      dispatch(setSelectedRows(selectedRows.filter((row) => row !== index)));
    } else {
      dispatch(setSelectedRows([...selectedRows, index]));
    }
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));

  return (
    <div className="w-full">
      <div className="flex flex-col text-2xl text-gray-900 font-medium p-6 mb-6 bg-white rounded-md border">
        <span>Top 10 Organizations Accessing Data</span>
        <TopOrgs entities={TopDatasets || []} />
      </div>

      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div className="rounded-lg px-4 py-5 flex flex-wrap items-center justify-between">
          <span className="font-semibold text-gray-700 mx-2 text-lg">
            Top by Access Frequency
          </span>

          <div className="ml-auto">
            <Button
              intent={"primary"}
              icon={<HiUpload />}
              onClick={() => dispatch(setOpenModal("publishDatasetForm"))}
            >
              Publish Dataset
            </Button>
          </div>

          <div className="hidden">
            <Modal identifier="addDataSourceForm">
              <AddDataSourceForm />
            </Modal>

            <Modal identifier="publishDatasetForm">
              <PublishDatasetForm />
            </Modal>
          </div>
        </div>

        {selectedRows.length > 0 && (
          <div className="flex items-center p-4 bg-gray-50">
            <Checkbox.Root
              className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
              checked={selectedRows.length > 0}
              onCheckedChange={() => clearSelectedRows?.()}
            >
              <Checkbox.Indicator className="text-white">
                <HiMinusSm />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <h3 className={"font-medium text-sm text-gray-700"}>
              {selectedRows.length} Item(s) Selected
            </h3>

            <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
              <IoRefresh className="mr-1 font-bold" />
              <span className="text-sm font-medium">Re-run</span>
            </button>
          </div>
        )}

        <Table
          rows={rows}
          headers={headers}
          menu={DatasetMenu}
          selectedRows={selectedRows}
          handleCheckbox={handleCheckbox}
        />
      </div>
    </div>
  );
};

export default DatasetsComp;
