import Image from "next/image";
import React from "react";

const Location = () => {
  return (
    <div className="flex-grow p-6 bg-white rounded-md inline-flex flex-col md:flex-row gap-y-4 md:gap-y-0 gap-x-16">
      <div className="flex-grow">
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

        <div className="w-full flex-col justify-start gap-2.5 flex border-b-2 border-gray-200 pb-2">
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
      <div className="rounded relative w-[50%]">
        <Image
          fill
          alt="Map"
          src="/map.png"
          sizes="100vw"
          className="object-center object-cover rounded"
        />
      </div>
    </div>
  );
};

export default Location;
