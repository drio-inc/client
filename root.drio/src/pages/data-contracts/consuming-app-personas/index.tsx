import Layout from "@/comps/Layout";
import Personas from "@/comps/RootAdmin/DataContracts/Personas";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const PersonasPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Personas />
      </DashboardContainer>
    </Layout>
  );
};

export default PersonasPage;
