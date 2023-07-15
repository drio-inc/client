import Layout from "@/comps/Layout";
import Accounts from "@/comps/SuperAdmin/Accounts";
import DashboardContainer from "@ui/Containers/DashboardContainer";

import WithAuth from "@/comps/HOC/WithAuth";

const AccountsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Accounts />
      </DashboardContainer>
    </Layout>
  );
};

export default WithAuth(AccountsPage);
