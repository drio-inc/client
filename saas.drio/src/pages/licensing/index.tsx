import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import { useAppSelector } from "@/hooks/useStoreTypes";
import Licensing from "@/comps/SuperAdmin/Licensing/Licensing";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const LicensingPage = () => {
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
          <Licensing />
        </DashboardContainer>
      </Layout>
    </div>
  );
};

export default LicensingPage;
