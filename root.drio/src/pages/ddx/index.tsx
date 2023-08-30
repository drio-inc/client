import Layout from "@/comps/Layout";
import DDX from "@/comps/RootAdmin/DDX";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const DDXPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <DDX />
      </DashboardContainer>
    </Layout>
  );
};

export default DDXPage;
