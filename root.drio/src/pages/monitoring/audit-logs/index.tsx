import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/useStoreTypes";
import AuditLogs from "@/comps/RootAdmin/Monitoring/AuditLogs";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const AuditLogsPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }

  return (
    <div>
      <Layout>
        <DashboardContainer>
          <AuditLogs />
        </DashboardContainer>
      </Layout>
    </div>
  );
};

export default AuditLogsPage;
