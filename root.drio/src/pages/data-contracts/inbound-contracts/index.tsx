import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
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

export default withAuth(InboundContractsPage);
