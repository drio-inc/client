import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const LexiconPage = () => {
  return (
    <Layout>
      <DashboardContainer>Lexicon</DashboardContainer>
    </Layout>
  );
};

export default withAuth(LexiconPage);
