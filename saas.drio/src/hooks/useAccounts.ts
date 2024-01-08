import { useEffect, useState } from "react";
import getAccounts from "@/functions/getAccounts";
import { Account } from "@/api/resources/accounts/types";
import { useGetAccountsQuery } from "@/api/resources/accounts";

export const useAccounts = () => {
  const [rows, setRows] = useState<Account[]>([]);
  const { data, isLoading } = useGetAccountsQuery();

  useEffect(() => {
    if (!isLoading && data) {
      const accountIds = data.map((account: Account) => account.id);
      getAccounts(accountIds).then((res) => setRows(res as Account[]));
    }
  }, [data, isLoading]);

  return { rows, isLoading };
};
