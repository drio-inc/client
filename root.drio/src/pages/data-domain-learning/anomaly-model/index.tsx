import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import AnomalyModel from "@/comps/RootAdmin/AnomalyModel";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const AnomalyModelPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <AnomalyModel />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(AnomalyModelPage);
