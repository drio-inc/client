import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import SubscribeDatasets from "@/comps/RootAdmin/DatasetMarketplace";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const SubscribeDatasetsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <SubscribeDatasets />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(SubscribeDatasetsPage);
