/* eslint-disable react/no-unescaped-entities */
import Table from "@/comps/ui/Table";
import Modal from "@/comps/ui/Modal";
import Button from "@/comps/ui/Button";

import {
  setRows,
  setRawRows,
  setSelectedRows,
} from "@/state/slices/metadataSlice";

import { useEffect, useState } from "react";
import { IoRefresh } from "react-icons/io5";
import { HiMinusSm, HiPlus, HiX } from "react-icons/hi";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { useRouter } from "next/router";
import getSchema from "@/functions/getSchema";
import { mergedDDXData } from "@/functions/mergeDDXData";
import { setRows as setDDXRows } from "@/state/slices/DDXSlice";
import { mergedDataSourceData } from "@/functions/mergeDataSources";
import { setRows as setDataSourceRows } from "@/state/slices/dataSourceSlice";
import getSchemaStats from "@/functions/getSchemaStats";
import { Fields } from "@/api/resources/datasets/types";

type Params = {
  id: string;
  ou_id: string;
  account_id: string;
};

const headers = [
  {
    header: "Dataset Name",
    accessor: "property",
  },
  {
    header: "Sample Value",
    accessor: "sample_value",
  },
  {
    header: "Data Type",
    accessor: "property_type",
  },
  {
    header: "Visibility",
    accessor: "visibility",
  },

  {
    header: "Last Updated",
    accessor: "last_updated",
  },
];

const SchemaStats = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [stats, setStats] = useState<Fields | null>(null);
  const { currentRow } = useAppSelector((state) => state.metadata);
  const { rows: dataSourceRows } = useAppSelector((state) => state.dataSource);

  const datasetName = router.query.dataset;
  const datasourceId = router.asPath.split("/")[3];

  useEffect(() => {
    const params = dataSourceRows?.find((row) => row?.id === datasourceId);

    getSchemaStats({
      ou_id: params?.ou_id ?? "",
      datasource_id: params?.id ?? "",
      account_id: params?.account_id ?? "",
    }).then((payload) => {
      const data = payload
        ?.find((row) => row?.name === datasetName)
        ?.fields.find((row) => row?.metric === currentRow?.property);

      if (data) {
        setStats(data);
      }
    });
  }, [
    dispatch,
    datasetName,
    datasourceId,
    dataSourceRows,
    currentRow?.property,
  ]);

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <span className="p-2 flex justify-end w-full">
          <HiX
            className="w-8 h-8 cursor-pointer hover:text-drio-red-dark transition-all duration-200"
            onClick={() => dispatch(setCloseModal("schemStatsDetails"))}
          />
        </span>
        <div className="mx-auto bg-white px-8 pb-8 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-bold text-center">
            Stats for '{currentRow?.property}'
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 my-4 text-gray-700 text-sm gap-y-2 shadow-sm border rounded-md bg-indigo-50 p-4">
            {stats ? (
              Object.entries(stats).map(([key, value]) => (
                <div className="flex gap-x-2" key={key}>
                  <span className="capitalize font-medium">{key}:</span>
                  <span>{value as string}</span>
                </div>
              ))
            ) : (
              <div className="flex justify-center w-full col-span-2">
                <span className="capitalize font-medium">No data</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaStats;
