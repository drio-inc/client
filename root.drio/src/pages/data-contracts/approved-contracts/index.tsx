import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import ApprovedContracts from "@/comps/RootAdmin/DataContracts/ApprovedContracts";

const ApprovedContractsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <ApprovedContracts />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(ApprovedContractsPage);
