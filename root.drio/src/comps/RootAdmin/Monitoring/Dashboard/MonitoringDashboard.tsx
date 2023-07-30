import React, { useState } from "react";
import StatCards from "./StatCards";
import DatasetAccessChart from "./DatasetAccessChart";
import AnomaliesAndErrorsChart from "./AnomaliesAndErrorsChart";

import "rsuite/dist/rsuite.css";
import { DateRangePicker } from "rsuite";
import { DateRange } from "rsuite/esm/DateRangePicker";

const Monitoring = () => {
  const [dateRange, setDateRange] = useState<any>([new Date(), new Date()]);

  const formatDate = (date: Date) => {
    return date.toString().split(" ").splice(0, 4).join(" ");
  };

  return (
    <div className="py-8">
      <div className="bg-gray-50 shadow-md pt-8">
        <div className="flex justify-end mb-4 mr-6">
          <DateRangePicker
            placement="leftStart"
            onChange={setDateRange}
            onClean={() => setDateRange([new Date(), new Date()])}
            placeholder={`${
              formatDate(dateRange[0]) + " - " + formatDate(dateRange[1])
            }`}
            renderValue={(value: DateRange, format: string) => {
              return `${formatDate(value[0])} - ${formatDate(value[1])}`;
            }}
          />
        </div>
        <StatCards />
        <DatasetAccessChart />
        <AnomaliesAndErrorsChart />
      </div>
    </div>
  );
};

export default Monitoring;
