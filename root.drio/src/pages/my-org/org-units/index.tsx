import Layout from "@/comps/Layout";
import OrgAccounts from "@/comps/RootAdmin/OrgUnits";
import DashboardContainer from "@ui/Containers/DashboardContainer";

import withAuth from "@/comps/HOC/withAuth";

const MyOrg = () => {
  return (
    <Layout>
      <DashboardContainer>
        <OrgAccounts />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(MyOrg);
