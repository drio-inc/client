import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import Accounts from "@/comps/SuperAdmin/Accounts";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const AccountsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Accounts />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(AccountsPage);
