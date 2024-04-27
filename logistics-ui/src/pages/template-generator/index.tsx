import Layout from "@/comps/Layout";
import Stats from "@/comps/Logistics/Stats";
import TemplateGenerator from "@/comps/Logistics/TemplateGenerator";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const StatsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <TemplateGenerator />
      </DashboardContainer>
    </Layout>
  );
};

export default StatsPage;
