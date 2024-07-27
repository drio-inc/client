import React, { useState } from "react";
import StatCards from "./DashboardComps/StatCards";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/comps/ui/Accordion";

import "rsuite/dist/rsuite.css";
import { DateRangePicker } from "rsuite";
import { DLArea, DRULine } from "./DDXSources";
import { DateRange } from "rsuite/esm/DateRangePicker";
import { MSDoughnut, MSStacked } from "./MonitoringSources";
import { DCRDoughnut, DCRStacked } from "./DataConsumptionRate";
import { KLBar, MCLBar, OCERArea, TCTMLine } from "./ConsumerStats";
import { IDTBar, TMLBar, DRULine as SDRULine, IQRULine } from "./StreamProducerStats";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/comps/ui/Select";
import { DPRDoughnut, DPRStacked } from "./DataProductionRate";
import { MCDoughnut, MCStacked } from "./MonitoringConsumers";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState<any>([new Date(), new Date()]);

  const formatDate = (date: Date) => {
    return date.toString().split(" ").splice(0, 4).join(" ");
  };

  return (
    <div>
      <StatCards />

      <div className="flex gap-x-4 my-4 p-4 bg-white rounded-md">
        <DateRangePicker
          placement="rightStart"
          onChange={setDateRange}
          onClean={() => setDateRange([new Date(), new Date()])}
          placeholder={`${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`}
          renderValue={(value: DateRange) => `${formatDate(value[0])} - ${formatDate(value[1])}`}
        />

        <Select>
          <SelectTrigger className="w-[255px] h-fit mr-3">
            <SelectValue placeholder="Filter by Organization Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="source-1">Corp 1</SelectItem>
            <SelectItem value="source-2">Corp 2</SelectItem>
            <SelectItem value="source-3">Corp 3</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[255px] h-fit mr-3">
            <SelectValue placeholder="Filter by DDX" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="source-1">DDX 1</SelectItem>
            <SelectItem value="source-2">DDX 2</SelectItem>
            <SelectItem value="source-3">DDX 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Accordion
        type="multiple"
        defaultValue={[
          "ddx",
          "consumer-stats",
          "monitoring-sources",
          "monitoring-consumers",
          "data-production-rate",
          "stream-producer-stats",
          "data-consumption-rate",
        ]}
      >
        <div className="flex w-full">
          <AccordionItem value="data-production-rate" className="bg-white w-1/2">
            <AccordionTrigger className="w-full bg-white">
              <div className="py-4 text-[#223354] text-2xl font-semibold">
                Data Production Rate by Sources
              </div>
            </AccordionTrigger>

            <AccordionContent className="flex gap-x-4">
              <div className="flex w-full justify-between bg-white gap-x-8 overflow-auto">
                <div className="border p-4 rounded-md w-[30%]">
                  <DPRDoughnut />
                </div>

                <div className="w-[70%]">
                  <DPRStacked />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-consumption-rate" className="bg-white w-1/2">
            <AccordionTrigger className="w-full bg-white">
              <div className="py-4 text-[#223354] text-2xl font-semibold">
                Data Consumption Rate by Consumers
              </div>
            </AccordionTrigger>

            <AccordionContent className="flex gap-x-4">
              <div className="flex w-full justify-between bg-white gap-x-8 overflow-auto">
                <div className="border p-4 rounded-md w-[30%]">
                  <DCRDoughnut />
                </div>

                <div className="w-[70%]">
                  <DCRStacked />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </div>

        <div className="flex w-full">
          <AccordionItem value="monitoring-sources" className="bg-white w-1/2">
            <AccordionTrigger className="w-full bg-white">
              <div className="py-4 text-[#223354] text-2xl font-semibold">
                Events, Anomalies, Errors and Alerts by Sources
              </div>
            </AccordionTrigger>

            <AccordionContent className="flex flex-col">
              <div className="flex w-full justify-between bg-white gap-x-8 overflow-auto">
                <div className="border p-4 rounded-md w-[30%]">
                  <MSDoughnut />
                </div>

                <div className="w-[70%]">
                  <MSStacked />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="monitoring-consumers" className="bg-white w-1/2">
            <AccordionTrigger className="w-full bg-white">
              <div className="py-4 text-[#223354] text-2xl font-semibold">
                Events, Anomalies, Errors and Alerts by Consumers
              </div>
            </AccordionTrigger>

            <AccordionContent className="flex flex-col">
              <div className="flex w-full justify-between bg-white gap-x-8 overflow-auto">
                <div className="border p-4 rounded-md w-[30%]">
                  <MCDoughnut />
                </div>

                <div className="w-[70%]">
                  <MCStacked />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </div>

        <AccordionItem value="ddx">
          <AccordionTrigger className="w-full bg-white">
            <div className="py-4 text-[#223354] text-2xl font-semibold">DDX</div>
          </AccordionTrigger>

          <AccordionContent className="flex w-full justify-between bg-white gap-x-4 overflow-auto">
            <div className="flex-1 border p-4 rounded-md">
              <DLArea />
            </div>

            <div className="flex-1 border p-4 rounded-md">
              <DRULine />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="stream-producer-stats">
          <AccordionTrigger className="w-full bg-white">
            <div className="py-4 text-[#223354] text-2xl font-semibold">Stream Producer Stats</div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-col bg-white gap-y-4">
            <div className="flex gap-x-4 overflow-auto w-full">
              <div className="flex-1 border p-4 rounded-md">
                <IDTBar />
              </div>

              <div className="flex-1 border p-4 rounded-md">
                <TMLBar />
              </div>
            </div>

            <div className="flex gap-x-4 overflow-auto w-full">
              <div className="flex-1 border p-4 rounded-md">
                <SDRULine />
              </div>

              <div className="flex-1 border p-4 rounded-md">
                <IQRULine />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="consumer-stats">
          <AccordionTrigger className="w-full bg-white">
            <div className="py-4 text-[#223354] text-2xl font-semibold">Consumer Stats</div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-col bg-white gap-y-4">
            <div className="flex gap-x-4 overflow-auto w-full">
              <div className="flex-1 border p-4 rounded-md">
                <MCLBar />
              </div>

              <div className="flex-1 border p-4 rounded-md">
                <KLBar />
              </div>
            </div>

            <div className="flex gap-x-4 overflow-auto w-full">
              <div className="flex-1 border p-4 rounded-md">
                <TCTMLine />
              </div>

              <div className="flex-1 border p-4 rounded-md">
                <OCERArea />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Dashboard;
