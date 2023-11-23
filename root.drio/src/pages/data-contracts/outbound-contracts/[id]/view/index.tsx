import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import ViewOutboundContractsForm from "@/comps/RootAdmin/DataContracts/OutboundContracts/ViewOutboundContractsForm";

const ViewOutboundContractPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <ViewOutboundContractsForm />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(ViewOutboundContractPage);
