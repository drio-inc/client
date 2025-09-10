import Layout from "@/comps/Layout";
import Button from "@/comps/ui/Button";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const DashboardPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-128px)]">
          <Button
            intent={"primary"}
            onClick={() => window.open("https://console-preview.neo4j.io", "_blank")}
          >
            Open Neo4j Console
          </Button>
        </div>
      </DashboardContainer>
    </Layout>
  );
};

export default DashboardPage;
