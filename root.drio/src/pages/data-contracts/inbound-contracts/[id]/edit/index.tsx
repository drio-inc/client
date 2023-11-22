import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import EditInboundContractsForm from "@/comps/RootAdmin/DataContracts/InboundContracts/EditInboundContractsForm";

const EditInboundContractPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <EditInboundContractsForm />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(EditInboundContractPage);
