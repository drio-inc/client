import Layout from "@/comps/Layout";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import ViewInboundContractsForm from "@/comps/RootAdmin/DataContracts/InboundContracts/ViewInboundContractsForm";

const ViewInboundContractPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <ViewInboundContractsForm />
      </DashboardContainer>
    </Layout>
  );
};

export default ViewInboundContractPage;
