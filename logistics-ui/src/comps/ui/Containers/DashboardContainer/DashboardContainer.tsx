import Header from "@ui/Header";
import { useMemo } from "react";
import Modal from "../../Modal";
import Sidebar from "@/comps/Sidebar";
import componentsMap from "@comps/ComponentsMap";
import { useAppSelector } from "@/hooks/useStoreTypes";

const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
  const modalID = useAppSelector((state) => state.ui.modalId);

  const ModalComp = useMemo(() => {
    if (!modalID) return null;
    const ModalContent = componentsMap[modalID as keyof typeof componentsMap];
    return ModalContent ? <ModalContent /> : null;
  }, [modalID]);

  return (
    <div className="">
      <Sidebar />
      <div className="relative md:ml-64">
        <div className="min-h-screen relative">
          <Header />
          <div className="px-6 py-8 mx-auto w-full bg-gray-100 custom-container">
            {children}
            {modalID && <Modal identifier="confirmQuote">{ModalComp}</Modal>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
