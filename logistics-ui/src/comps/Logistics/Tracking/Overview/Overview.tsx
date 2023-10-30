import Image from "next/image";
import { useAppSelector } from "@/hooks/useStoreTypes";

const Overview = () => {
  const shipmentState = useAppSelector((state) => state.shipment);

  return (
    <div className="col-span-12 lg:col-span-6 p-6 bg-white rounded-md flex-col gap-6 inline-flex">
      <h2 className="text-neutral-900 text-2xl font-bold leading-9">
        Shipment Overview
      </h2>

      <div className="w-full flex flex-wrap flex-col md:flex-row gap-6">
        <div className="flex-1 w-full md:w-48 lg:w-60 xl:w-72 p-4 bg-slate-50 rounded shadow flex-col justify-center items-center gap-3 inline-flex">
          <div className="w-20 h-20 relative">
            <Image src="/clock.svg" alt="Status Check Time" fill />
          </div>

          <div className="flex-col justify-center items-center gap-1 flex">
            <h3 className="text-neutral-900 text-3xl font-medium leading-10">
              {shipmentState.selectedRow
                ? new Date(
                    shipmentState.selectedRow?.statusCheckTime
                  ).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })
                : new Date().toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
            </h3>
            <span className="text-center text-slate-600 text-base font-bold">
              Status Check Time
            </span>
          </div>
        </div>

        <div className="flex-1 w-full md:w-48 lg:w-60 xl:w-72 p-4 bg-slate-50 rounded shadow flex-col justify-center items-center gap-3 inline-flex">
          <div className="w-20 h-20 relative">
            <Image src="/map-location.svg" alt="Actual Time of Arrival" fill />
          </div>
          <div className="flex-col justify-center items-center gap-1 flex">
            <h3 className="text-neutral-900 text-3xl font-medium leading-10">
              {shipmentState.selectedRow
                ? new Date(shipmentState.selectedRow?.actualETA).toLocaleString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }
                  )
                : "N/A"}
            </h3>
            <span className="text-center text-slate-600 text-base font-bold">
              Actual Time of Arrival
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
