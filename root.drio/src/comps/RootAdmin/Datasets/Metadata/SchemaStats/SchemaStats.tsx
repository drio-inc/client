/* eslint-disable react/no-unescaped-entities */

import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { setCloseModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { useRouter } from "next/router";
import getSchemaStats from "@/functions/getSchemaStats";
import { Fields } from "@/api/resources/datasets/types";

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

      if (data) setStats(data);
    });
  }, [
    dispatch,
    datasetName,
    datasourceId,
    dataSourceRows,
    currentRow?.property,
  ]);

  return (
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
              <div className="flex gap-x-1" key={key}>
                <span className="capitalize font-semibold">{key}:</span>
                <span>{value as string}</span>
              </div>
            ))
          ) : (
            <div className="flex justify-center w-full col-span-2">
              <span className="font-medium">
                No stats found for this schema type
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemaStats;
