import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import ContractLearning from "@/comps/RootAdmin/ContractLearning";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const ContractLearningPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <ContractLearning />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(ContractLearningPage);
