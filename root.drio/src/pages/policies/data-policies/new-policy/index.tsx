import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import AddPolicyForm from "@/comps/RootAdmin/Policies/DataPolicies/AddPolicyForm";

const NewPolicyPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <AddPolicyForm />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(NewPolicyPage);
