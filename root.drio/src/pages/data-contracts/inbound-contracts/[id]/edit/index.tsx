import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/useStoreTypes";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import EditInboundContractsForm from "@/comps/RootAdmin/DataContracts/InboundContracts/EditInboundContractsForm";

const DatasetsPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }
  return (
    <Layout>
      <DashboardContainer>
        <EditInboundContractsForm />
      </DashboardContainer>
    </Layout>
  );
};

export default DatasetsPage;
