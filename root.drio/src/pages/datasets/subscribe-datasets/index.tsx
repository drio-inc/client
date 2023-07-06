import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/useStoreTypes";
import SubscribeDatasets from "@/comps/RootAdmin/SubscribeDatasets";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const SubscribeDatasetsPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }

  return (
    <Layout>
      <DashboardContainer>
        <SubscribeDatasets />
      </DashboardContainer>
    </Layout>
  );
};

export default SubscribeDatasetsPage;
