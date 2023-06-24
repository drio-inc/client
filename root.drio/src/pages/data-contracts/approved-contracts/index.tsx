import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/useStoreTypes";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import ApprovedContracts from "@/comps/RootAdmin/DataContracts/ApprovedContracts";

const ApprovedContractsPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }

  return (
    <Layout>
      <DashboardContainer>
        <ApprovedContracts />
      </DashboardContainer>
    </Layout>
  );
};

export default ApprovedContractsPage;
