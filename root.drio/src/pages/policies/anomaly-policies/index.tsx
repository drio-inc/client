import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const AnomalyPoliciesPage = () => {
  return (
    <Layout>
      <DashboardContainer>Anomaly Policies</DashboardContainer>
    </Layout>
  );
};

export default withAuth(AnomalyPoliciesPage);
