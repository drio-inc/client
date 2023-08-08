import Layout from "@/comps/Layout";
import { useRouter } from "next/router";

import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

const AuthenticationPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <DashboardContainer>
        <section className="relative flex h-[80vh] flex-col items-center justify-center">
          <h1 className="text-8xl font-semibold">Authentication</h1>
        </section>
      </DashboardContainer>
    </Layout>
  );
};

export default AuthenticationPage;
