import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import OutboundContracts from "@/comps/RootAdmin/DataContracts/OutboundContracts";

const OutboundContractsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <OutboundContracts />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(OutboundContractsPage);
