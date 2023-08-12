import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/useStoreTypes";
import OrgAccounts from "@/comps/RootAdmin/OrgUnits";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const MyOrg = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }

  return (
    <Layout>
      <DashboardContainer>
        <OrgAccounts />
      </DashboardContainer>
    </Layout>
  );
};

export default MyOrg;
