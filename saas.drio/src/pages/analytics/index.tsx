import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const AnalyticsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <section className="relative flex h-full flex-col items-center justify-center">
          <h1 className="text-8xl font-semibold">Analytics</h1>
        </section>
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(AnalyticsPage);
