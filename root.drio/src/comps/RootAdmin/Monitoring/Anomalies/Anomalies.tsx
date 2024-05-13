import { useEffect } from "react";
import Table from "@/comps/ui/Table";
import AnomaliesJSON from "@/data/anomalies.json";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { setRow, setRows, setRawRows, setSelectedRows } from "@/state/slices/anomaliesSlice";

import Modal from "@/comps/ui/Modal";
import { HiMinusSm } from "react-icons/hi";
import { IoRefresh } from "react-icons/io5";
import getAnomalies from "@/functions/getAnomalies";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setOpenModal } from "@/state/slices/uiSlice";

import AnomalyDetails from "./AnomalyDetails";
import { mergedDDXData } from "@/functions/mergeDDXData";
import { setRows as setDDXRows } from "@/state/slices/DDXSlice";
import { mergedDataSourceData } from "@/functions/mergeDataSources";
import { setRows as setDataSourceRows } from "@/state/slices/dataSourceSlice";

const headers = [
  {
    header: "",
    accessor: "status",
  },
  {
    header: "Dataset",
    accessor: "name",
  },
  {
    header: "Data Source",
    accessor: "ds",
  },
  {
    header: "Event Type",
    accessor: "event_type",
  },
  {
    header: "Anomaly Method",
    accessor: "anomaly_method",
  },
  {
    header: "Time Occurred",
    accessor: "timestamp",
  },
  {
    header: "Severity",
    accessor: "severity",
    status: {
      Error: "bg-red-100 text-red-800 px-2 py-1 font-medium rounded",
      Warning: "bg-yellow-100 text-yellow-800 px-2 py-1 font-medium rounded",
      Informational: "bg-blue-100 text-blue-800 px-2 py-1 font-medium rounded",
    },
  },
  {
    header: "Accessing ORG",
    accessor: "ou",
  },
];

const Anomalies = () => {
  const dispatch = useAppDispatch();
  const { recursiveRows } = useAppSelector((state) => state.orgUnit);
  const { rows, selectedRows } = useAppSelector((state) => state.anomalies);
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

    getAnomalies(dataSourceIds).then((payload) => {
      dispatch(setRows([...AnomaliesJSON, ...payload.data]));
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

  const handleRowClick = (row: TableRow) => {
    dispatch(setRow(row));
    dispatch(setOpenModal("anomalyDetails"));
  };

  const transformData = () => {
    return rows.map((row) => {
      return {
        ...row,
        ou: row?.ou ?? "Corp",
        severity: row?.severity ?? "Informational",
        timestamp: new Date(row.timestamp).toLocaleString(),
      };
    });
  };

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        {selectedRows.length > 0 && (
          <div className="flex items-center p-4 bg-gray-50">
            <Checkbox.Root
              className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
              checked={selectedRows.length > 0}
              onCheckedChange={() => {
                clearSelectedRows?.();
              }}
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

        <div className="hidden">
          <Modal identifier="anomalyDetails">
            <AnomalyDetails />
          </Modal>
        </div>

        <Table
          headers={headers}
          rows={transformData()}
          selectedRows={selectedRows}
          handleCheckbox={handleCheckbox}
          handleRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default Anomalies;
