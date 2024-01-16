import { v4 as uuidv4 } from "uuid";
import { store } from "@/state/store";
import { datasetsApi } from "@/api/resources/datasets";

type Params = {
  ou_id: string;
  account_id: string;
  datasource_id: string;
};

export default async function getSchemas(dataSourceIds: Params[]) {
  const schemaPromises = dataSourceIds.map(async (source) => {
    const { data } = await store.dispatch(
      datasetsApi.endpoints.getSchemas.initiate(source, {
        forceRefetch: true,
      })
    );

    return data;
  });

  const schemas = await Promise.all(schemaPromises).then((res) => {
    const transformedData = res?.flatMap((schema) =>
      schema?.schemas.map((s) => ({
        ...s,
        id: uuidv4(),
        sample_value: "null",
        visibility: "public",
        schemas: schema.schemas,
        tags: Object.values(s.properties),
        data_source_id: schema?.data_source_id,
        last_updated: new Date(Date.now())?.toLocaleString(),
      }))
    );

    return {
      rawData: res.filter((schema) => schema !== undefined),
      data: transformedData.filter((schema) => schema !== undefined),
    };
  });

  return schemas;
}
