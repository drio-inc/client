import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const TroubleshootingPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <section className="relative flex h-[80vh] flex-col items-center justify-center">
          <h1 className="text-8xl font-semibold">Troubleshooting</h1>
        </section>
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(TroubleshootingPage);
