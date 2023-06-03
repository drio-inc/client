import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/useStoreTypes";
import DataSources from "@/comps/RootAdmin/DataSources";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const DatasetsPage = () => {
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
          <DataSources />
        </DashboardContainer>
      </Layout>
    </div>
  );
};

export default DatasetsPage;
