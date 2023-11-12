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
    <div>
      <StatCards />

      <div className="flex my-4 p-4 bg-white rounded-md">
        <DateRangePicker
          placement="rightStart"
          onChange={setDateRange}
          onClean={() => setDateRange([new Date(), new Date()])}
          placeholder={`${formatDate(dateRange[0])} - ${formatDate(
            dateRange[1]
          )}`}
          renderValue={(value: DateRange, format: string) =>
            `${formatDate(value[0])} - ${formatDate(value[1])}`
          }
        />
      </div>

      <DatasetAccessChart />
      <AnomaliesAndErrorsChart />
    </div>
  );
};

export default Monitoring;
