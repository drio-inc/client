import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";

import DDX from "@/comps/SuperAdmin/DDX";
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

export default withAuth(DDXPage);
