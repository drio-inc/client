/* eslint-disable react/no-unescaped-entities */

import {
  RiGlobeLine,
  RiMapPin5Line,
  RiRoadMapLine,
  RiPinDistanceLine,
} from "react-icons/ri";

import { useAppSelector } from "@/hooks/useStoreTypes";
import Image from "next/image";

const Status = () => {
  const shipmentState = useAppSelector((state) => state.shipment);

  return (
    <div
      className={`col-span-12 lg:col-span-5 lg:-ml-4 p-4 lg:p-8 ${
        shipmentState.selectedRow ? `bg-[#F6FAFF]` : `bg-white`
      } flex-grow rounded-lg lg:rounded-none lg:rounded-tr-md lg:rounded-br-md flex-col justify-center gap-12 inline-flex`}
    >
      <div className="flex-col items-center gap-4 lg:gap-8 flex">
        <div className="flex-col gap-2 flex w-full">
          <h3 className="text-neutral-900 text-xl font-bold leading-relaxed">
            Delivery Status
          </h3>
          <span className="text-slate-600 text-sm leading-tight font-medium">
            {shipmentState.selectedRow ? (
              <>
                Order No: <span className="font-bold">#12737689</span>
              </>
            ) : (
              <span>Choose an order to track its status</span>
            )}
          </span>

          {shipmentState.selectedRow && (
            <div className="flex-col items-start gap-2 flex mt-4">
              <div className="w-full relative">
                <div className="w-full h-1 left-0 top-[4.63px] absolute bg-gradient-to-r from-red-100 via-red-400 to-red-800 rounded-xl" />
                <div className="w-full h-3 left-[0.24px] top-0 absolute justify-between items-center inline-flex">
                  <div className="w-3 h-3 bg-rose-300 rounded-full" />
                  <div className="w-3 h-3 bg-rose-400 rounded-full" />
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-red-700 rounded-full" />
                  <div className="w-3 h-3 bg-red-800 rounded-full" />
                </div>
              </div>
            </div>
          )}
        </div>

        {shipmentState.selectedRow && (
          <div className="flex-col items-center gap-4 flex">
            <div className="w-full justify-between items-start inline-flex text-gray-500 text-xs font-semibold leading-relaxed">
              <span>23 April, 2023</span>
              <span>30 April, 2023</span>
            </div>
            <div className="w-64 text-center flex-col items-center flex leading-7">
              <h2 className="text-red-800 text-xl font-semibold">Delivered</h2>
              <span className="text-gray-700 text-sm font-medium">
                to Minneapolis, Minnesota
              </span>
            </div>
          </div>
        )}
      </div>

      {shipmentState.selectedRow ? (
        <div className="flex-col flex-wrap items-start gap-6 flex">
          <div className="gap-4 flex flex-wrap flex-col md:flex-row w-full">
            <div className="p-3 rounded-md shadow border border-gray-400 items-center gap-3 flex flex-1">
              <div className="p-2 bg-sky-100 rounded justify-center items-center flex">
                <RiMapPin5Line className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex-col items-start inline-flex font-semibold leading-tight">
                <h3 className="text-neutral-900 text-sm">Current Location</h3>
                <span className="text-slate-600 text-xs">
                  Los Angeles, USA{" "}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-md shadow border border-gray-400 items-center gap-3 flex flex-1">
              <div className="p-2 bg-sky-100 rounded justify-center items-center flex">
                <RiRoadMapLine className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex-col  items-start inline-flex font-semibold leading-tight">
                <h3 className="text-neutral-900 text-sm">
                  Destination Location
                </h3>
                <span className="text-slate-600 text-xs">
                  Minneapolis, Minnesota
                </span>
              </div>
            </div>
          </div>

          <div className="gap-4 flex flex-wrap flex-col md:flex-row w-full">
            <div className="p-3 rounded-md shadow border border-gray-400 items-center gap-3 flex flex-1">
              <div className="p-2 bg-sky-100 rounded justify-center items-center gap-2 flex">
                <RiPinDistanceLine className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex-col  items-start inline-flex font-semibold leading-tight">
                <h3 className="text-neutral-900 text-sm">Distance in KM</h3>
                <span className="text-slate-600 text-xs">65 km</span>
              </div>
            </div>
            <div className="p-3 rounded-md shadow border border-gray-400  items-center gap-3 flex flex-1">
              <div className="p-2 bg-sky-100 rounded justify-center items-center gap-2 flex">
                <RiGlobeLine className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex-col items-start inline-flex font-semibold leading-tight">
                <h3 className="text-neutral-900 text-sm">Origin Lat long</h3>
                <span className="text-slate-600 text-xs">
                  N 50° 6' 52.776", W 94° 31' 21.5148"
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center pb-2">
          <Image
            width={300}
            height={300}
            alt="Empty State"
            className="object-cover object-center"
            src="/delivery-service.svg"
          />
        </div>
      )}
    </div>
  );
};

export default Status;
