import React, { useState } from "react";
import StatCards from "./StatCards";
import DatasetAccessChart from "./DatasetAccessChart";
import AnomaliesAndErrorsChart from "./AnomaliesAndErrorsChart";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/comps/ui/Accordion";

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
          placeholder={`${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`}
          renderValue={(value: DateRange) => `${formatDate(value[0])} - ${formatDate(value[1])}`}
        />
      </div>

      <Accordion type="multiple">
        <AccordionItem value="dataset-access-chart">
          <AccordionTrigger>
            <div className="p-4 bg-white rounded-md">Dataset Access Chart</div>
          </AccordionTrigger>

          <AccordionContent>
            <DatasetAccessChart />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="anomalies-and-errors-chart">
          <AccordionTrigger>
            <div className="p-4 bg-white rounded-md">Anomalies and Errors Chart</div>
          </AccordionTrigger>

          <AccordionContent>
            <AnomaliesAndErrorsChart />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Monitoring;
