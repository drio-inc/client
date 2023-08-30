import Layout from "@/comps/Layout";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import MonitoringDashboard from "@/comps/RootAdmin/Monitoring/Dashboard";

const MonitoringPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <MonitoringDashboard />
      </DashboardContainer>
    </Layout>
  );
};

export default MonitoringPage;
