import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import EditPolicyForm from "@/comps/RootAdmin/Policies/DataPolicies/EditPolicyForm";

const NewPolicyPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <EditPolicyForm />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(NewPolicyPage);
