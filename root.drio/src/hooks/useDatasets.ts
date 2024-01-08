import { useEffect, useState } from "react";
import getDatasets from "@/functions/getDatasets";
import { Dataset } from "@/api/resources/datasets/types";
import { useGetDatasetsQuery } from "@/api/resources/datasets";

export const useAccounts = ({ params }: Params) => {
  const [rows, setRows] = useState<Dataset[]>([]);
  const { data, isLoading } = useGetDatasetsQuery();

  useEffect(() => {
    if (!isLoading && data) {
      const accountIds = data.map((account: Account) => account.id);
      getAccounts(accountIds).then((res) => setRows(res as Account[]));
    }
  }, [data, isLoading]);

  return { rows, isLoading };
};
