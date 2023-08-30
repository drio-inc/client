import Layout from "@/comps/Layout";
import Datasets from "@/comps/RootAdmin/Datasets";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const DatasetsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Datasets />
      </DashboardContainer>
    </Layout>
  );
};

export default DatasetsPage;
