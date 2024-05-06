import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import MonitoringDashboard from "@/comps/RootAdmin/Monitoring/Dashboard";

const DashboardPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <MonitoringDashboard />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(DashboardPage);
