import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/useStoreTypes";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import MonitoringDashboard from "@/comps/RootAdmin/Monitoring/Dashboard";

const MonitoringPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }

  return (
    <div>
      <Layout>
        <DashboardContainer>
          <MonitoringDashboard />
        </DashboardContainer>
      </Layout>
    </div>
  );
};

export default MonitoringPage;
