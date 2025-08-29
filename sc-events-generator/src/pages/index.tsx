import Events from "@/comps/Event";
import Layout from "@/comps/Layout/Layout";
import DashboardContainer from "@/comps/ui/Containers/DashboardContainer";

export default function Home() {
  return (
    <Layout>
      <DashboardContainer>
      	<Events/>
      </DashboardContainer>
    </Layout>
  );
}
