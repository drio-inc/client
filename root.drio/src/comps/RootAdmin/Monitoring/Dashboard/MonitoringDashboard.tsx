import React from "react";
import StatCards from "./StatCards";
import { HiOutlineCalendar } from "react-icons/hi";
import DatasetAccessChart from "./DatasetAccessChart";
import AnomaliesAndErrorsChart from "./AnomaliesAndErrorsChart";

const Monitoring = () => {
  return (
    <div className="py-8">
      <div className="bg-gray-50 shadow-md pt-8">
        <div className="flex justify-end mb-4 mr-6">
          <span className="text-gray-500 border rounded-lg shadow-sm p-2 bg-white flex items-center">
            <HiOutlineCalendar className="w-6 h-6 mr-2" />
            From Oct 21 , 2020 To Oct 21, 2021
          </span>
        </div>
        <StatCards />

        <DatasetAccessChart />
        <AnomaliesAndErrorsChart />
      </div>
    </div>
  );
};

export default Monitoring;
