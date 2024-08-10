import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import ViewSubscriptionContractsForm from "@/comps/RootAdmin/DataContracts/SubscriptionContracts/ViewSubscriptionContractsForm";

const ViewSubscriptionContractPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <ViewSubscriptionContractsForm />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(ViewSubscriptionContractPage);
