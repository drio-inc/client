import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import AnomalyPolicies from "@/comps/RootAdmin/Policies/AnomalyPolicies";

const AnomalyPoliciesPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <AnomalyPolicies />
      </DashboardContainer>
    </Layout>
  );
};

export default AnomalyPoliciesPage;
