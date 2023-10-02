import Layout from "@/comps/Layout";
import Stats from "@/comps/Logistics/Stats";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const StatsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Stats />
      </DashboardContainer>
    </Layout>
  );
};

export default StatsPage;
