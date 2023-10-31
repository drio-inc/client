import { useAppSelector } from "@/hooks/useStoreTypes";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "4px",
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

  return (
    <div className="col-span-12 lg:col-span-6 p-4 bg-white rounded-md flex flex-col md:flex-row gap-y-4 md:gap-y-0 gap-x-4 2xl:gap-x-16">
      <div className="md:w-[40%] w-full">
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
              className="justify-between items-start inline-flex text-sm font-medium leading-normal"
              key={index}
            >
              <span className="text-gray-500">{location.destLocation}</span>
              <span className="text-gray-700">{location.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow rounded relative h-48 md:h-full w-full md:w-[60%]">
        {isLoaded && (
          <GoogleMap
            zoom={1}
            options={{
              disableDefaultUI: true,
              restriction: {
                latLngBounds: {
                  north: 85,
                  east: 175,
                  south: -85,
                  west: -175,
                },
                strictBounds: true,
              },
            }}
            mapContainerStyle={containerStyle}
            center={{
              lat: 0,
              lng: 0,
            }}
          >
            {shipmentData.rows.map((location, index) => (
              <MarkerF
                key={index}
                position={{
                  lat: location.currentLat,
                  lng: location.currentLong,
                }}
              />
            ))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default Location;
