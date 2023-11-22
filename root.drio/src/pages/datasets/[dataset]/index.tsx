import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
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

export default withAuth(DatasetsPage);
