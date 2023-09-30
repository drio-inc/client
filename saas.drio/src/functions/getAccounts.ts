import { store } from "@/state/store";
import { accountApi } from "@/api/resources/accounts";

export default async function getAccounts(accountIds: string[]) {
  const accountPromises = accountIds.map(async (id) => {
    const { data } = await store.dispatch(
      accountApi.endpoints.getAccountById.initiate(id)
    );

    return data;
  });

  const accounts = await Promise.all(accountPromises);
  return accounts;
}
