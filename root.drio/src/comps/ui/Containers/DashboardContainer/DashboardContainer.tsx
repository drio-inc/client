import Sidebar from "@/comps/Sidebar";
import React from "react";
import Header from "@ui/Header";
import DashboardFooter from "@ui/Footer/DashbaordFooter";

const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        <Header />
        <div className="px-6 mx-auto w-full bg-gray-100">{children}</div>
      </div>
    </>
  );
};

export default DashboardContainer;
