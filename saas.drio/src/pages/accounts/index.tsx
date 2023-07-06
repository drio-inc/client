import Layout from "@/comps/Layout";
import { useRouter } from "next/router";

import Accounts from "@/comps/SuperAdmin/Accounts";
import { useAppSelector } from "@/hooks/useStoreTypes";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const AccountsPage = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // if (!isAuthenticated) {
  //   router.push("/login");
  //   return <Loader />;
  // }

  return (
    <Layout>
      <DashboardContainer>
        <Accounts />
      </DashboardContainer>
    </Layout>
  );
};

export default AccountsPage;
