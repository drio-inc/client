import Layout from "@/comps/Layout";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const PersonasPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <section className="relative flex h-[80vh] flex-col items-center justify-center">
          <h1 className="text-8xl font-semibold">Personas</h1>
        </section>
      </DashboardContainer>
    </Layout>
  );
};

export default PersonasPage;
