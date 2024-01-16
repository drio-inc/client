import Modal from "../../Modal";
import Header from "@ui/Header";
import Sidebar from "@/comps/Sidebar";
import Notificationbar from "@/comps/Notificationbar";
import AnomalyDetails from "@/comps/RootAdmin/Monitoring/Anomalies/AnomalyDetails";

const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Sidebar />
      <div className="relative md:ml-64">
        <div className="min-h-screen relative">
          <Header />
          <div className="px-6 py-8 mx-auto w-full bg-gray-100 custom-container">
            {children}
          </div>
        </div>
      </div>

      <Notificationbar />

      <div className="hidden">
        <Modal identifier="anomalyDetails">
          <AnomalyDetails />
        </Modal>
      </div>
    </div>
  );
};

export default DashboardContainer;
