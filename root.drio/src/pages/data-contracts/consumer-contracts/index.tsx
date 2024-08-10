import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import ConsumerContracts from "@/comps/RootAdmin/DataContracts/ConsumerContracts";
import ApprovedContracts from "@/comps/RootAdmin/DataContracts/ApprovedContracts";

const ConsumerContractsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <ConsumerContracts />
        <ApprovedContracts />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(ConsumerContractsPage);
