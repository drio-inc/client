import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import Notifications from "@/comps/RootAdmin/Policies/Notifications";

const NotificationsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Notifications />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(NotificationsPage);
