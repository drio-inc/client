import Layout from "@/comps/Layout";
import Loader from "@ui/Loader/Loader";
import Button from "@/comps/ui/Button";
import { useRouter } from "next/router";
import { HiLogout } from "react-icons/hi";

import { logOut } from "@/state/slices/authSlice";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import Datasets from "@/comps/RootAdmin/Datasets";
import DatasetDetails from "@/comps/RootAdmin/Datasets/DatasetDetails/DatasetDetails";

const DatasetsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }

  return (
    <div>
      <Layout>
        <DashboardContainer>
          <DatasetDetails />
        </DashboardContainer>
      </Layout>
    </div>
  );
};

export default DatasetsPage;
