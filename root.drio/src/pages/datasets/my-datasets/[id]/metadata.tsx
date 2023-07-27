import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/useStoreTypes";
import Metadata from "@/comps/RootAdmin/Datasets/Metadata";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const MetadataPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }

  return (
    <Layout>
      <DashboardContainer>
        <Metadata />
      </DashboardContainer>
    </Layout>
  );
};

export default MetadataPage;
