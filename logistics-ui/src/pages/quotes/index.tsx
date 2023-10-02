import Layout from "@/comps/Layout";
import Quotes from "@/comps/Logistics/Quotes";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const QuotesPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Quotes />
      </DashboardContainer>
    </Layout>
  );
};

export default QuotesPage;
