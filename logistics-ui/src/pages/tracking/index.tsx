import Layout from "@/comps/Layout";
import Tracking from "@/comps/Logistics/Tracking";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const TrackingPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Tracking />
      </DashboardContainer>
    </Layout>
  );
};

export default TrackingPage;
