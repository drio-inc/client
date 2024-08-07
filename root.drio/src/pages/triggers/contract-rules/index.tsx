import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import ContractRules from "@/comps/RootAdmin/Triggers/ContractRules";

const ContractRulesPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <ContractRules />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(ContractRulesPage);
