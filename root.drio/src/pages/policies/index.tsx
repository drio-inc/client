import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import { useRouter } from "next/router";

import Policies from "@/comps/RootAdmin/Policies";
import { useAppSelector } from "@/hooks/useStoreTypes";
import DashboardContainer from "@ui/Containers/DashboardContainer";

const PoliciesPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Policies />
      </DashboardContainer>
    </Layout>
  );
};

export default PoliciesPage;
