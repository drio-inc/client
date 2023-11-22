import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
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

export default withAuth(AuditLogsPage);
