import WithAuth from "@/comps/HOC/WithAuth";
import Layout from "@/comps/Layout";

import OrgAccounts from "@/comps/SuperAdmin/OrgAccounts";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const AccountsPage = () => {
  return (
    <div>
      <Layout>
        <DashboardContainer>
          <OrgAccounts />
        </DashboardContainer>
      </Layout>
    </div>
  );
};

export default WithAuth(AccountsPage);
