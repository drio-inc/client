import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import Dashboard from "@/comps/RootAdmin/Dashboard";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const DashboardPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Dashboard />
      </DashboardContainer>
    </Layout>
  );
};

export default DashboardPage;
