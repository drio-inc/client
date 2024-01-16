import { store } from "@/state/store";

export const mergedDataSourceData = () => {
  return store
    .getState()
    .orgUnit?.recursiveRows?.reduce((acc: TableRow[], row) => {
      const dsWithInfo =
        (row?.data_sources &&
          row?.data_sources.map((ds: DataSource) => {
            const schema_registry =
              (row?.schema_registries &&
                row?.schema_registries?.find(
                  (sr: RegistryData) => sr.id === ds.sr_id
                )) ??
              null;

            const metadaa_server =
              (row?.metadata_servers &&
                row?.metadata_servers?.find(
                  (ms: RegistryData) => ms.id === ds.ms_id
                )) ??
              null;

            return {
              ...ds,
              datasets: 25,
              ou: row.name,
              documentation: "Swagger",
              metadata_server: metadaa_server,
              schema_registry: schema_registry,
              schema_endpoints: schema_registry?.endpoints,
              metadata_endpoints: metadaa_server?.endpoints,
            };
          })) ||
        [];
      return [...acc, ...dsWithInfo];
    }, []);
};
