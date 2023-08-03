import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/useStoreTypes";
import Alerts from "@/comps/RootAdmin/Monitoring/Alerts";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const MonitoringPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }

  return (
    <Layout>
      <DashboardContainer>
        <Alerts />
      </DashboardContainer>
    </Layout>
  );
};

export default MonitoringPage;
