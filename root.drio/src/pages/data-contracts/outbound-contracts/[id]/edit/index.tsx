import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import EditOutboundContractsForm from "@/comps/RootAdmin/DataContracts/OutboundContracts/EditOutboundContractsForm";

const EditInboundContractPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <EditOutboundContractsForm />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(EditInboundContractPage);
