import Layout from "@/comps/Layout";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import AddNewPolicyForm from "@/comps/RootAdmin/Policies/AddNewPolicyForm";

const PoliciesPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <AddNewPolicyForm />
      </DashboardContainer>
    </Layout>
  );
};

export default PoliciesPage;
