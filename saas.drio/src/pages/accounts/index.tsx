import Image from "next/image";
import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import Button from "@/comps/ui/Button";
import { useRouter } from "next/router";
import { HiLogout } from "react-icons/hi";

import { logOut } from "@/state/slices/authSlice";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import Accounts from "@/comps/SuperAdmin/Accounts";

const AccountsPage = () => {
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
          <Accounts />
        </DashboardContainer>
      </Layout>
    </div>
  );
};

export default AccountsPage;
