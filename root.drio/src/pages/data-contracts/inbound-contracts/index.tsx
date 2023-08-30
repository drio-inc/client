import Layout from "@/comps/Layout";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import InboundContracts from "@/comps/RootAdmin/DataContracts/InboundContracts";

const InboundContractsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <InboundContracts />
      </DashboardContainer>
    </Layout>
  );
};

export default InboundContractsPage;
