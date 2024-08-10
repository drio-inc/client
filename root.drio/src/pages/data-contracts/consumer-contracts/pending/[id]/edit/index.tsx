import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import EditConsumerContractsForm from "@/comps/RootAdmin/DataContracts/ConsumerContracts/EditConsumerContractsForm";

const EditConsumerContractPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <EditConsumerContractsForm />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(EditConsumerContractPage);
