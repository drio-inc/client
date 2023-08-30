import Layout from "@/comps/Layout";
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

export default MetadataPage;
