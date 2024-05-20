import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import AlertPolicies from "@/comps/RootAdmin/Policies/AlertPolicies";

const AlertPoliciesPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <AlertPolicies />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(AlertPoliciesPage);
