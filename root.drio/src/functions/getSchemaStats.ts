import { v4 as uuidv4 } from "uuid";
import { store } from "@/state/store";
import { datasetsApi } from "@/api/resources/datasets";

type Params = {
  ou_id: string;
  account_id: string;
  datasource_id: string;
};

export default async function getSchemaStats(params: Params) {
  const schemaPromise = await store.dispatch(
    datasetsApi.endpoints.getSchemaStats.initiate(params, {
      forceRefetch: true,
    })
  );

  return schemaPromise?.data?.stats;
}
