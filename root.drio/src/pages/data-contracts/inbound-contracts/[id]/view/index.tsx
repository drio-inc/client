import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
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

export default withAuth(ViewInboundContractPage);
