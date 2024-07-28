import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import Settings from "@/comps/RootAdmin/Settings";

const SettingsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Settings />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(SettingsPage);
