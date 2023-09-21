import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DataSources from "@/comps/RootAdmin/DataSources";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const DataSourcepage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <DataSources />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(DataSourcepage);
