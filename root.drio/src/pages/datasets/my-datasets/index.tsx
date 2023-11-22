import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
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

export default withAuth(DatasetsPage);
