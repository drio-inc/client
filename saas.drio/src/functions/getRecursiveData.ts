import { store } from "@/state/store";
import { accountApi } from "@/api/resources/accounts";

export default async function getRecusriveData(accountIds: string[]) {
  const accountDetailsPromises = accountIds.map(async (id) => {
    const { data } = await store.dispatch(
      accountApi.endpoints.getAccountById.initiate(id)
    );

    return data;
  });

  const accountDetails = await Promise.all(accountDetailsPromises);
  return accountDetails;
}
