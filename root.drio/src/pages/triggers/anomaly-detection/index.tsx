import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import AnomalyRules from "@/comps/RootAdmin/Triggers/AnomalyRules";

const AnomalyRulesPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <AnomalyRules />
      </DashboardContainer>
    </Layout>
  );
};

export default AnomalyRulesPage;
