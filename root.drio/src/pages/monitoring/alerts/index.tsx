import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import Alerts from "@/comps/RootAdmin/Monitoring/Alerts";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const AlertsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Alerts />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(AlertsPage);
