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
    console.log(source);

    const { data } = await store.dispatch(
      anomaliesApi.endpoints.getAnomalies.initiate(source, {
        forceRefetch: true,
      })
    );

    console.log(data);
    return data;
  });

  const anomalies = await Promise.all(anomaliesPromises).then((res) => {
    const transformedData = res?.flatMap((response) =>
      response?.anomalies.map((anomaly) => ({
        id: uuidv4(),
        ...anomaly,
        anomalies: response.anomalies,
        data_source_id: response?.data_source_id,
        ou: rows.find((row) => row.id === response?.data_source_id)?.ou,
        ds: rows.find((row) => row.id === response?.data_source_id)?.name,
      }))
    );

    return {
      rawData: res.filter((dataset) => dataset !== undefined),
      data: transformedData.filter((dataset) => dataset !== undefined),
    };
  });

  return anomalies;
}
