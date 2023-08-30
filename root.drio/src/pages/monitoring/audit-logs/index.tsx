import Layout from "@/comps/Layout";
import AuditLogs from "@/comps/RootAdmin/Monitoring/AuditLogs";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const AuditLogsPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <AuditLogs />
      </DashboardContainer>
    </Layout>
  );
};

export default AuditLogsPage;
