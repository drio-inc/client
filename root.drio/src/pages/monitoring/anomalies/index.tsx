import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import Anomalies from "@/comps/RootAdmin/Monitoring/Anomalies";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const AnomaliesPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Anomalies />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(AnomaliesPage);
