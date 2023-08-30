import Layout from "@/comps/Layout";
import DataSources from "@/comps/RootAdmin/DataSources";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const DatasetsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <DataSources />
      </DashboardContainer>
    </Layout>
  );
};

export default DatasetsPage;
