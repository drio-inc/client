import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import TriggerChannels from "@/comps/RootAdmin/Triggers/TriggerChannels";

const TriggerChannelsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <TriggerChannels />
      </DashboardContainer>
    </Layout>
  );
};

export default TriggerChannelsPage;
