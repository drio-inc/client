import Layout from "@/comps/Layout";
import Alerts from "@/comps/RootAdmin/Monitoring/Alerts";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const MonitoringPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Alerts />
      </DashboardContainer>
    </Layout>
  );
};

export default MonitoringPage;
