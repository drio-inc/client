import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import Policies from "@/comps/RootAdmin/Policies";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const PoliciesPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Policies />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(PoliciesPage);
