import { v4 as uuidv4 } from "uuid";
import { store } from "@/state/store";
import { datasetsApi } from "@/api/resources/datasets";

type Params = {
  ou_id: string;
  account_id: string;
  datasource_id: string;
};

export default async function getSchemas(params: Params) {
  let transformed: {
    property: string;
    visibility: string;
    dataset_name: string;
    dataset_type: string;
    property_type: string;
    last_updated: string | undefined;
    data_source_id: string | undefined;
  }[] = [];

  const schemaPromise = await store.dispatch(
    datasetsApi.endpoints.getSchemas.initiate(params, {
      forceRefetch: true,
    })
  );

  schemaPromise?.data?.schemas.forEach((schema) => {
    let dataset_name = schema.name;
    let dataset_type = schema.type;

    // Iterate through each property in the schema
    Object.keys(schema.properties).forEach((property) => {
      let property_type =
        schema.properties[property as keyof typeof schema.properties].type;

      // Create a new object for each property
      let transformedObject = {
        property: property,
        visibility: "public",
        dataset_name: dataset_name,
        dataset_type: dataset_type,
        property_type: property_type,
        data_source_id: schemaPromise?.data?.data_source_id,
        last_updated: new Date(Date.now())?.toLocaleString(),
      };

      // Add the object to the transformed list
      transformed.push(transformedObject);
    });
  });

  return transformed;
}
