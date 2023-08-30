import Layout from "@/comps/Layout";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import OutboundContracts from "@/comps/RootAdmin/DataContracts/OutboundContracts";

const InboundContractsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <OutboundContracts />
      </DashboardContainer>
    </Layout>
  );
};

export default InboundContractsPage;
