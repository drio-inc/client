import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import Authentication from "@/comps/RootAdmin/Authentication";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const AuthenticationPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Authentication />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(AuthenticationPage);
