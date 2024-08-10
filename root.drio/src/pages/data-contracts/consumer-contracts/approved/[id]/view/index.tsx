import Layout from "@/comps/Layout";
import withAuth from "@/comps/HOC/withAuth";
import DashboardContainer from "@ui/Containers/DashboardContainer";
import ViewApprovedContractsForm from "@/comps/RootAdmin/DataContracts/ApprovedContracts/ViewApprovedContractsForm";

const ViewApprovedContractPage = () => {
  return (
    <Layout>
      <DashboardContainer>
        <ViewApprovedContractsForm />
      </DashboardContainer>
    </Layout>
  );
};

export default withAuth(ViewApprovedContractPage);
