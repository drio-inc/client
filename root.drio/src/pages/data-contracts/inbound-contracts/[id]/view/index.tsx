import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/useStoreTypes";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import ViewInboundContractsForm from "@/comps/RootAdmin/DataContracts/InboundContracts/ViewInboundContractsForm";

const ViewInboundContractPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }
  return (
    <Layout>
      <DashboardContainer>
        <ViewInboundContractsForm />
      </DashboardContainer>
    </Layout>
  );
};

export default ViewInboundContractPage;
