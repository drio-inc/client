import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import RuleTemplates from "@/comps/SuperAdmin/RuleTemplates";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const RuleTemplatesPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <RuleTemplates />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(RuleTemplatesPage);
