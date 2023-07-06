import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import DDX from "@/comps/SuperAdmin/DDX";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import { useAppSelector } from "@/hooks/useStoreTypes";

const DDXPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // if (!isAuthenticated) {
  //   router.push("/login");
  //   return <Loader />;
  // }

  return (
    <Layout>
      <DashboardContainer>
        <DDX />
      </DashboardContainer>
    </Layout>
  );
};

export default DDXPage;
