import { v4 as uuidv4 } from "uuid";
import { store } from "@/state/store";
import { datasetsApi } from "@/api/resources/datasets";

type Params = {
  ou_id: string;
  account_id: string;
  datasource_id: string;
};

export default async function getDatasets(dataSourceIds: Params[]) {
  const { rows } = store.getState().dataSource;

  const datasetPromises = dataSourceIds.map(async (source) => {
    const { data } = await store.dispatch(
      datasetsApi.endpoints.getDatasets.initiate(source, {
        forceRefetch: true,
      })
    );

    return data;
  });

  const datasets = await Promise.all(datasetPromises).then((res) => {
    const transformedData = res?.flatMap((dataset) =>
      dataset?.topics_details.map((topic) => ({
        alerts: 7,
        id: uuidv4(),
        frequency: 10,
        name: topic.name,
        status: "learning",
        visibility: "public",
        contractInPlace: "Yes",
        sixMonthsAccess: "Yes",
        topics: dataset.topics,
        partition_count: topic.partition_count,
        data_source_id: dataset?.data_source_id,
        replication_factor: topic.replication_factor,
        ou: rows.find((row) => row.id === dataset?.data_source_id)?.ou,
        ds: rows.find((row) => row.id === dataset?.data_source_id)?.name,
      }))
    );

    return {
      rawData: res.filter((dataset) => dataset !== undefined),
      data: transformedData.filter((dataset) => dataset !== undefined),
    };
  });

  return datasets;
}
