/* eslint-disable react/no-unescaped-entities */

import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import { setCloseModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { useRouter } from "next/router";
import { Fields } from "@/api/resources/datasets/types";
import { useGetSchemaStatsQuery } from "@/api/resources/datasets";

const SchemaStats = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [stats, setStats] = useState<Fields | null>(null);
  const { currentRow } = useAppSelector((state) => state.metadata);
  const { rows: dataSourceRows } = useAppSelector((state) => state.dataSource);

  const datasetName = router.query.dataset;
  const datasourceId = router.asPath.split("/")[3];
  const params = dataSourceRows?.find((row) => row?.id === datasourceId);

  const { data, isLoading } = useGetSchemaStatsQuery({
    ou_id: params?.ou_id ?? "",
    datasource_id: params?.id ?? "",
    account_id: params?.account_id ?? "",
  });

  useEffect(() => {
    if (data) {
      const statsData = data?.stats
        ?.find((row) => row?.name === datasetName)
        ?.fields.find((row) => row?.metric === currentRow?.property);

      if (statsData) setStats(statsData);
    }
  }, [currentRow?.property, data, datasetName]);

  return (
    <div className="relative flex flex-col w-[500px] shadow-lg rounded-lg bg-white">
      <span className="flex justify-end w-full">
        <HiX
          className="m-2 absolute w-8 h-8 cursor-pointer hover:text-drio-red-dark transition-all duration-200"
          onClick={() => dispatch(setCloseModal("schemStatsDetails"))}
        />
      </span>
      <div className="bg-white px-8 py-4 rounded-lg">
        <h2 className="text-gray-700 text-2xl font-bold text-center">
          Stats for{" "}
          <span className="text-drio-red">'{currentRow?.property}'</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 my-4 text-gray-700 text-sm gap-y-2 shadow-sm border rounded-md bg-indigo-50 p-4">
          {stats ? (
            Object.entries(stats).map(([key, value]) => (
              <div className="flex gap-x-1" key={key}>
                <span className="font-semibold">{key}:</span>
                <span>{value as string}</span>
              </div>
            ))
          ) : (
            <div className="flex justify-center w-full col-span-2">
              <span className="font-medium">
                {isLoading ? (
                  <RiLoader4Fill
                    className="animate-spin text-5xl text-drio-red font-bold"
                    data-testid="loading-svg"
                  />
                ) : (
                  "No stats found for this schema type"
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemaStats;
