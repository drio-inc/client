import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import EditContractRuleForm from "@/comps/RootAdmin/Triggers/ContractRules/EditContractRuleForm";

const EditContractRulePage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <EditContractRuleForm />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(EditContractRulePage);
