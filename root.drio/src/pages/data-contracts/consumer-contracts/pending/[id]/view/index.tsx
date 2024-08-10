import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import ViewConsumerContractsForm from "@/comps/RootAdmin/DataContracts/ConsumerContracts/ViewConsumerContractsForm";

const ViewConsumerContractPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <ViewConsumerContractsForm />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(ViewConsumerContractPage);
