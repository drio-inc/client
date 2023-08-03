import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/useStoreTypes";
import Anomalies from "@/comps/RootAdmin/Monitoring/Anomalies";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const AnomaliesPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }

  return (
    <Layout>
      <DashboardContainer>
        <Anomalies />
      </DashboardContainer>
    </Layout>
  );
};

export default AnomaliesPage;
