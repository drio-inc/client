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

    Object.keys(schema.properties).forEach((property) => {
      let property_type = schema.properties[property as keyof typeof schema.properties].type;

      let transformedObject = {
        id: uuidv4(),
        key_name_tags: [],
        sample_value: null,
        data_field_tags: [],
        property: property,
        visibility: "Hidden",
        dataset_name: dataset_name,
        dataset_type: dataset_type,
        property_type: property_type,
        enhanced_property_type: "N/A",
        data_source_id: schemaPromise?.data?.data_source_id,
        last_updated: new Date(Date.now())?.toLocaleString(),
      };

      transformed.push(transformedObject);
    });
  });

  return transformed;
}
