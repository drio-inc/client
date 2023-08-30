import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import OrgAccounts from "@/comps/RootAdmin/OrgUnits";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const OrgUnitPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <OrgAccounts />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(OrgUnitPage);
