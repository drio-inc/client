import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import AddContractRuleForm from "@/comps/RootAdmin/Triggers/ContractRules/AddContractRuleForm";

const NewContractRulePage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <AddContractRuleForm />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(NewContractRulePage);
