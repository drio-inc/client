import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import OrgAccounts from "@/comps/SuperAdmin/OrgAccounts";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

const MyOrg = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/auth/login");
    return <Loader />;
  }

  return (
    <div>
      <Layout>
        <DashboardContainer>
          <OrgAccounts />
        </DashboardContainer>
      </Layout>
    </div>
  );
};

export default MyOrg;
