import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import Metadata from "@/comps/RootAdmin/Datasets/Metadata";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const MetadataPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Metadata />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(MetadataPage);
