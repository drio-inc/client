import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
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

export default withAuth(LicensingPage);
