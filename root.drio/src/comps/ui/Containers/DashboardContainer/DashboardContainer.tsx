import Header from "@ui/Header";
import Sidebar from "@/comps/Sidebar";

const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        <div className="min-h-screen relative">
          <Header />
          <div className="px-6 mx-auto w-full bg-gray-100 custom-container">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardContainer;
