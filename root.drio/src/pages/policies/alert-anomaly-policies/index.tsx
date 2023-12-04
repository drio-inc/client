import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import AlertAnomalyPolicies from "@/comps/RootAdmin/Policies/AlertAnomalyPolicies";

const PoliciesPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <AlertAnomalyPolicies />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(PoliciesPage);
