import { useCallback } from "react";
import { useAppSelector } from "@/hooks/useStoreTypes";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "100%",
  borderRadius: "4px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Location = () => {
  const shipmentData = useAppSelector((state) => state.shipment);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBIA1Gc3jOTZxqiy68P8ICr4uXjBF84BZM",
  });

  const groupByDestLocation = () => {
    const result: {
      count: number;
      percentage?: string;
      destLocation: string;
    }[] = [];

    const map = new Map();

    for (const item of shipmentData.rows) {
      if (!map.has(item.destLocation)) {
        map.set(item.destLocation, true);
        result.push({
          destLocation: item.destLocation,
          count: 1,
        });
      } else {
        for (const i of result) {
          if (i.destLocation === item.destLocation) {
            i.count++;
          }
        }
      }
    }
    return result.map((item) => ({
      ...item,
      percentage: ((item.count / shipmentData.rows.length) * 100).toFixed(2),
    }));
  };

  console.log(groupByDestLocation());

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
          {groupByDestLocation().map((location, index) => (
            <div
              className="justify-between items-start inline-flex"
              key={index}
            >
              <div className="text-gray-500 text-sm font-semibold leading-normal">
                {location.destLocation}
              </div>
              <div className="text-gray-700 text-sm font-semibold leading-normal">
                {location.percentage}%
              </div>
            </div>
          ))}
          {/* <div className="justify-between items-start inline-flex">
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
          </div> */}
        </div>
      </div>
      <div className="flex-grow rounded relative h-48 md:h-full w-full md:w-1/2">
        {isLoaded && (
          <GoogleMap
            zoom={8}
            center={center}
            mapContainerStyle={containerStyle}
          ></GoogleMap>
        )}
      </div>
    </div>
  );
};

export default Location;
