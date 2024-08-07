import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import TriggerRules from "@/comps/RootAdmin/Triggers/TriggerRules";

const TriggerRulesPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <TriggerRules />
      </DashboardContainer>
    </Layout>
  );
};

export default TriggerRulesPage;
