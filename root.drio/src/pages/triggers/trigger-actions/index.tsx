import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import TriggerActions from "@/comps/RootAdmin/Triggers/TriggerActions";

const TriggerActionsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <TriggerActions />
      </DashboardContainer>
    </Layout>
  );
};

export default TriggerActionsPage;
