import Layout from "@/comps/Layout";
import WithAuth from "@/comps/HOC/WithAuth";

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

export default WithAuth(DDXPage);
