import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import SubscriptionContracts from "@/comps/RootAdmin/DataContracts/SubscriptionContracts";

const SubscriptionContractsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <SubscriptionContracts />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(SubscriptionContractsPage);
