import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import EditSubscriptionContractsForm from "@/comps/RootAdmin/DataContracts/SubscriptionContracts/EditSubscriptionContractsForm";

const EditConsumerContractPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <EditSubscriptionContractsForm />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(EditConsumerContractPage);
