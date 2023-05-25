import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import Button from "@/comps/ui/Button";
import { useRouter } from "next/router";
import { HiLogout } from "react-icons/hi";

import DDX from "@/comps/SuperAdmin/DDX";
import { logOut } from "@/state/slices/authSlice";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

const DDXPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }

  return (
    <div>
      <Layout>
        <DashboardContainer>
          <DDX />
        </DashboardContainer>
      </Layout>
    </div>
  );
};

export default DDXPage;
