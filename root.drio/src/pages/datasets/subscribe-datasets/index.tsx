import Layout from "@/comps/Layout";
import SubscribeDatasets from "@/comps/RootAdmin/SubscribeDatasets";
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

export default SubscribeDatasetsPage;
