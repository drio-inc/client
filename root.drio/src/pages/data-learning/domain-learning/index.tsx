import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DomainLearning from "@/comps/RootAdmin/DomainLearning";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const DomainLearningPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <DomainLearning />
      </DashboardContainer>
    </Layout>
  );
};

export default DomainLearningPage;
