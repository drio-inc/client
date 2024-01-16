import { v4 as uuidv4 } from "uuid";
import { store } from "@/state/store";
import { anomaliesApi } from "@/api/resources/anomalies";

type Params = {
  ou_id: string;
  account_id: string;
  datasource_id: string;
};

export default async function getAnomalies(dataSourceIds: Params[]) {
  const { rows } = store.getState().dataSource;

  const anomaliesPromises = dataSourceIds.map(async (source) => {
    const { data } = await store.dispatch(
      anomaliesApi.endpoints.getAnomalies.initiate(source, {
        forceRefetch: true,
      })
    );

    return data;
  });

  const anomalies = await Promise.all(anomaliesPromises).then((res) => {
    const transformedData = res?.flatMap((res) =>
      res?.anomalies.map((anomaly) => ({
        ...anomaly,
        id: uuidv4(),
        anomalies: res.anomalies,
        data_source_id: res?.data_source_id,
        ou: rows.find(({ id }) => id === res?.data_source_id)?.ou as string,
        ds: rows.find(({ id }) => id === res?.data_source_id)?.name as string,
      }))
    );

    return {
      rawData: res.filter((dataset) => dataset !== undefined),
      data: transformedData.filter((dataset) => dataset !== undefined),
    };
  });

  return anomalies;
}
