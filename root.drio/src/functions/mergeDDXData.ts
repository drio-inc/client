import { store } from "@/state/store";
import { Country } from "country-state-city";

export const mergedDDXData = () => {
  return store
    .getState()
    .orgUnit.recursiveRows.reduce((acc: TableRow[], row) => {
      const ddxClusterWithInfo =
        (row.ddx_clusters &&
          row.ddx_clusters.map((ddx: DDXCluster) => {
            return {
              ...ddx,
              ou: row.name,
              location: `${row.city}, ${row.state}, ${row.country}`,
              country: Country.getCountryByCode(row.country)?.name,
              status:
                ddx.ddx_instances &&
                ddx.ddx_instances.length > 0 &&
                ddx.ddx_instances.some(
                  (instance) => instance.state === "running"
                )
                  ? "active"
                  : "inactive",
            };
          })) ||
        [];
      return [...acc, ...ddxClusterWithInfo];
    }, []);
};
