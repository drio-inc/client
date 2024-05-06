import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const AnomalyModelPage = () => {
  return (
    <Layout>
      <DashboardContainer>Anomaly Model</DashboardContainer>
    </Layout>
  );
};

export default withAuth(AnomalyModelPage);
