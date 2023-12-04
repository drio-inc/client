import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DataPolicies from "@/comps/RootAdmin/Policies/DataPolicies";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const PoliciesPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <DataPolicies />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(PoliciesPage);
