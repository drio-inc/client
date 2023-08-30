import Layout from "@/comps/Layout";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import DatasetDetails from "@/comps/RootAdmin/Datasets/DatasetDetails";

const DatasetsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <DatasetDetails />
      </DashboardContainer>
    </Layout>
  );
};

export default DatasetsPage;
