import Layout from "@/comps/Layout";
import Inventory from "@/comps/Logistics/Inventory";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const InventoryPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Inventory />
      </DashboardContainer>
    </Layout>
  );
};

export default InventoryPage;
