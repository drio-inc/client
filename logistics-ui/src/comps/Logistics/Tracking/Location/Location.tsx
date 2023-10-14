import Image from "next/image";
import React from "react";

const Location = () => {
  return (
    <div className="col-span-12 lg:col-span-6 p-4 bg-white rounded-md flex flex-col md:flex-row gap-y-4 md:gap-y-0 gap-x-4 2xl:gap-x-16">
      <div className="md:w-1/2 w-full">
        <div className="flex flex-col -mt-1">
          <h2 className="text-slate-600 text-2xl font-bold mb-2">
            Shipments by Location
          </h2>

          <div className="p-3.5 bg-blue-50 rounded-md items-center inline-flex -ml-1 mb-4">
            <h3 className="text-gray-700 text-base font-semibold leading-normal">
              North America
            </h3>
          </div>
        </div>

        <div className="flex-col justify-start gap-2.5 flex border-b-2 border-gray-200 pb-2">
          <div className="justify-between items-start inline-flex">
            <div className="text-gray-500 text-sm font-semibold leading-normal">
              Bangkok
            </div>
            <div className="text-gray-700 text-sm font-semibold leading-normal">
              15%
            </div>
          </div>
          <div className="justify-between items-start inline-flex">
            <div className="text-gray-500 text-sm font-semibold leading-normal">
              Houston
            </div>
            <div className="text-gray-700 text-sm font-semibold leading-normal">
              15%
            </div>
          </div>
          <div className="justify-between items-start inline-flex">
            <div className="text-gray-500 text-sm font-semibold leading-normal">
              San Francisco
            </div>
            <div className="text-gray-700 text-sm font-semibold leading-normal">
              15%
            </div>
          </div>
          <div className="justify-between items-start inline-flex">
            <div className="text-gray-500 text-sm font-semibold leading-normal">
              West Virginia
            </div>
            <div className="text-gray-700 text-sm font-semibold leading-normal">
              15%
            </div>
          </div>
          <div className="justify-between items-start inline-flex">
            <div className="text-gray-500 text-sm font-semibold leading-normal">
              Milwaukee
            </div>
            <div className="text-gray-700 text-sm font-semibold leading-normal">
              15%
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow rounded relative h-48 md:h-full w-full md:w-1/2">
        <Image
          fill
          alt="Map"
          src="/map.png"
          className="object-center object-cover rounded"
        />
      </div>
    </div>
  );
};

export default Location;
