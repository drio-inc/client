import Layout from "@/comps/Layout";
import Products from "@/comps/Logistics/Products";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const ProductsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Products />
      </DashboardContainer>
    </Layout>
  );
};

export default ProductsPage;
