import StatCards from "./StatCards";
import React, { useState } from "react";
import DatasetAccessChart from "./DatasetAccessChart";
import AnomaliesAndErrorsChart from "./AnomaliesAndErrorsChart";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/comps/ui/Accordion";

import "rsuite/dist/rsuite.css";
import { DateRangePicker } from "rsuite";
import { DateRange } from "rsuite/esm/DateRangePicker";
import { IDTBar, TMLBar } from "./StreamProducerStats";
import { MSDoughnut, MSStacked } from "./MonitoringSources";
import { DPRDoughnut, DPRStacked } from "./DataProductionRate";
import { DSPRDoughnut, DSPRStacked } from "./DataSourceProductionRate";
import { KLBar, MCLBar } from "./ConsumerStats";

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

      <Accordion type="multiple" defaultValue={["data-source-production-rate"]}>
        <AccordionItem value="data-production-rate">
          <AccordionTrigger className="w-full bg-white">
            <div className="py-4 text-[#223354] text-2xl font-semibold">Data Production Rate</div>
          </AccordionTrigger>

          <AccordionContent className="flex w-full justify-between bg-white gap-x-8 overflow-auto">
            <div className="border p-4 rounded-md">
              <DPRDoughnut />
            </div>

            <div className="flex-1">
              <DPRStacked />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="data-source-production-rate">
          <AccordionTrigger className="w-full bg-white">
            <div className="py-4 text-[#223354] text-2xl font-semibold">
              Data Production Rate of Source
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex w-full justify-between bg-white gap-x-8 overflow-auto">
            <div className="border p-4 rounded-md">
              <DSPRDoughnut />
            </div>

            <div className="flex-1">
              <DSPRStacked />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="monitoring-sources">
          <AccordionTrigger className="w-full bg-white">
            <div className="py-4 text-[#223354] text-2xl font-semibold">
              Events, Anomalies, Errors and Alert by Sources
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex w-full justify-between bg-white gap-x-8 overflow-auto">
            <div className="border p-4 rounded-md">
              <MSDoughnut />
            </div>

            <div className="flex-1">
              <MSStacked />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ddx">
          <AccordionTrigger className="w-full bg-white">
            <div className="py-4 text-[#223354] text-2xl font-semibold">DDX</div>
          </AccordionTrigger>

          <AccordionContent>
            <DatasetAccessChart />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="stream-producer-stats">
          <AccordionTrigger className="w-full bg-white">
            <div className="py-4 text-[#223354] text-2xl font-semibold">Stream Producer Stats</div>
          </AccordionTrigger>

          <AccordionContent className="flex w-full justify-between bg-white gap-x-4 overflow-auto">
            <div className="border p-4 rounded-md flex-1">
              <IDTBar />
            </div>

            <div className="flex-1 border p-4 rounded-md">
              <TMLBar />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="consumer-stats">
          <AccordionTrigger className="w-full bg-white">
            <div className="py-4 text-[#223354] text-2xl font-semibold">Consumer Stats</div>
          </AccordionTrigger>

          <AccordionContent className="flex w-full justify-between bg-white gap-x-4 overflow-auto">
            <div className="border p-4 rounded-md">
              <MCLBar />
            </div>

            <div className="border p-4 rounded-md">
              <KLBar />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dataset-access-chart">
          <AccordionTrigger className="w-full bg-white">
            <div className="py-4 text-[#223354] text-2xl font-semibold">Dataset Access Chart</div>
          </AccordionTrigger>

          <AccordionContent>
            <DatasetAccessChart />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="anomalies-and-errors-chart">
          <AccordionTrigger className="w-full bg-white">
            <div className="py-4 text-[#223354] text-2xl font-semibold">
              Anomalies and Errors Chart
            </div>
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
