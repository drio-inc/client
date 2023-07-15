import Layout from "@/comps/Layout";
import Button from "@/comps/ui/Button";
import { useRouter } from "next/router";
import { HiLogout } from "react-icons/hi";

import WithAuth from "@/comps/HOC/WithAuth";
import { logOut } from "@/state/slices/authSlice";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/login");
  };

  return (
    <Layout>
      <DashboardContainer>
        <section className="relative flex h-full flex-col items-center justify-center">
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
  );
};

export default WithAuth(Dashboard);
