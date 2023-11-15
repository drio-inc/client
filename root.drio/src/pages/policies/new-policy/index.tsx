import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import AddNewPolicyForm from "@/comps/RootAdmin/Policies/AddNewPolicyForm";

const NewPolicyPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <AddNewPolicyForm />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(NewPolicyPage);
