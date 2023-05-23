import Image from "next/image";
import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import Button from "@/comps/ui/Button";
import { useRouter } from "next/router";
import { HiLogout } from "react-icons/hi";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import { logOut } from "@/state/slices/authSlice";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/auth/login");
    return <Loader />;
  }

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/auth/login");
  };

  return (
    <div>
      <Layout>
        <DashboardContainer>
          <section className="relative flex min-h-screen flex-col items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Drio Logo"
              width={145}
              height={145}
              className="absolute top-0 left-0 m-6"
            />
            <span className="m-6 absolute top-0 right-0">
              {user?.id ?? "0000-0000-0000-0000"}
            </span>

            <span className="m-6 absolute top-8 right-0">
              {user?.userName ?? "Tim Cook"}
            </span>
            <h1 className="text-8xl font-semibold">Dashboard</h1>
            <Button
              intent={"primary"}
              onClick={() => handleLogout()}
              className="mt-8 flex justify-center items-center"
            >
              <span className="text-lg md:text-2xl py-2">
                Logout
                <HiLogout className="inline-block w-6 h-6 ml-2" />
              </span>
            </Button>
          </section>
        </DashboardContainer>
      </Layout>
    </div>
  );
};

export default Dashboard;
