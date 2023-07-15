import Layout from "@/comps/Layout";
import WithAuth from "@/comps/HOC/WithAuth";
import Licensing from "@/comps/SuperAdmin/Licensing/Licensing";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const LicensingPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Licensing />
      </DashboardContainer>
    </Layout>
  );
};

export default WithAuth(LicensingPage);
