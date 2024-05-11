/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { v4 as uuid } from "uuid";
import { HiMinus, HiPlus } from "react-icons/hi";

interface Layout2Props {
  items: ItemInformation[];
  setItems: React.Dispatch<React.SetStateAction<ItemInformation[]>>;
}

const documentInformation = {
  "Transaction Set Purpose Code": "Original",
  "Forecast Order Number": "8800000958",
  "Release Number": "331",
  "Forecast Type Qualifier": "Delivery Based",
  "Forecast Quantity Qualifier": "Actual Discrete Quantities",
  "Schedule Horizon Start Date": "05/10/2016",
  "Schedule Horizon End Date": "03/07/2016",
  "Issue Date": "12/25/2016",
};

const referenceInformation = {
  "Warehouse Storage Location": "21WF",
  Number: "1",
};

const shipFromInformation = {
  "Company Name": "Tesla Motors",
  "Additional Name": "Tesla Motors",
  "Assigned by Buyer": "Tesla Motors",
  Address: "",
  "Address 1": "3500 Deer Creek Road",
  "Address 2": "",
  "Citiy/State/Zip": "Palo Alto, CA 94304",
  Country: "US",
};

const shipToInformation = {
  "Company Name": "Tesla Motors",
  "Additional Name": "Tesla Motors",
  "Assigned by Buyer": "Tesla Motors",
  Address: "",
  "Address 1": "3500 Deer Creek Road",
  "Address 2": "",
  "Citiy/State/Zip": "Palo Alto, CA 94304",
  Country: "US",
};

const Layout_2 = ({ items, setItems }: Layout2Props) => {
  const addForecast = (id: string) => {
    setItems((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            "Forecast Schedule": [
              ...p["Forecast Schedule"],
              {
                id: uuid(),
                Quantity: "0",
                "Forecast Qualifier": "N/A",
                "Timing Qualifier": "N/A",
                Date: "N/A",
              },
            ],
          };
        }

        return p;
      })
    );
  };
  const deleteForecastSchedule = (id: string, index: number) => {
    setItems((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            "Forecast Schedule": p["Forecast Schedule"].filter((_, i) => i !== index),
          };
        }

        return p;
      })
    );
  };

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold mb-2 text-center">Tesla Motors</h3>
          <Image src="/tesla.png" width={150} height={150} alt={"Tesla Logo"} />
        </div>

        <div className="flex flex-col items-end p-4 gap-y-1">
          <h1 className="text-2xl font-semibold">Planning Schedule with Release Capacity(830)</h1>

          <h5>
            Message ID : <span contentEditable>11916187</span>
          </h5>

          <h5>
            Reference # : <span contentEditable>8800000958</span>
          </h5>
        </div>
      </div>

      {/* First Row */}
      <div>
        <div className="bg-[#003569] px-2 py-1 align-middle flex items-center">
          <h5 className="font-semibold text-white">Document Information</h5>
        </div>

        <div className="grid grid-cols-3 gap-x-1">
          {/* First Column */}
          <div>
            <div className="bg-[#E4E9EB]">
              <h5 className="font-semibold px-2">Planning Schedule Information</h5>
            </div>

            <div className="px-2 bg-[#F0F3F4]">
              {Object.entries(documentInformation).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <div>{key}</div>
                  <div contentEditable>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Column */}
          <div>
            <div className="bg-[#E4E9EB]">
              <h5 className="font-semibold">Reference Information</h5>
            </div>

            <div className="px-2 bg-[#F0F3F4] h-[87%]">
              {Object.entries(referenceInformation).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <div>{key}</div>
                  <div contentEditable>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Third Column */}
          <div className="h-full bg-[#F0F3F4]" />
        </div>
      </div>

      {/* Second Row */}
      <div>
        <div className="bg-[#003569] px-2 py-1">
          <h5 className="font-semibold text-white">Address Information</h5>
        </div>

        <div className="grid grid-cols-3 gap-x-1">
          {/* First Column */}
          <div>
            <div className="bg-[#E4E9EB]">
              <h5 className="font-semibold px-2">Ship From</h5>
            </div>

            <div className="px-2 bg-[#F0F3F4]">
              {Object.entries(shipFromInformation).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <div>{key}</div>
                  <div contentEditable>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Column */}
          <div>
            <div className="bg-[#E4E9EB]">
              <h5 className="font-semibold">Ship To</h5>
            </div>

            <div className="px-2 bg-[#F0F3F4]">
              {Object.entries(shipToInformation).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <div>{key}</div>
                  <div contentEditable>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Third Column */}
          <div className="h-full bg-[#F0F3F4]" />
        </div>
      </div>

      {/* Third Row */}

      {items.map((item, index) => (
        <>
          <div
            onMouseEnter={(e) => {
              // Show he Hidden Icons
              const icons = e.currentTarget.querySelector("span");
              icons?.classList.remove("hidden");
              icons?.classList.add("flex");
            }}
            onMouseLeave={(e) => {
              // Hide the Hidden Icons
              const icons = e.currentTarget.querySelector("span");
              icons?.classList.add("hidden");
              icons?.classList.remove("flex");
            }}
          >
            <div className="bg-[#003569] px-2 py-1 flex justify-between">
              <h5 className="font-semibold text-white">Item Detail</h5>

              <span className="">
                <HiPlus
                  className="cursor-pointer w-6 h-6 text-white"
                  onClick={() => addForecast(item.id)}
                />
              </span>
            </div>

            <div className="grid grid-cols-[200px_100px_minmax(900px,_1fr)] gap-x-1">
              {/* First Column */}
              <div className="h-full bg-[#F0F3F4]">
                <div className="flex gap-x-2 px-2">
                  <input type="checkbox" placeholder="Item Number" />
                  <h5 contentEditable>Line #</h5>
                </div>
              </div>

              {/* Second Column */}

              <div className="h-full bg-[#F0F3F4]">
                <h5 contentEditable>{item["Line #"]}</h5>
              </div>

              {/* Third Column(Grid) */}
              <div className="h-full bg-[#F0F3F4]">
                {/* Third Column - First Row */}
                <div className="flex gap-x-16 border border-white">
                  <h5>Buyer's Part Number</h5>
                  <span contentEditable>{item["Buyer's Part Number"]}</span>
                </div>

                {/* Third Column - Second Row */}
                <div className="grid grid-cols-3 gap-x-1">
                  {/* First Column */}
                  <div className="border border-white">
                    <div className="bg-[#E4E9EB]">
                      <h5 className="font-semibold px-2">Unit Detail</h5>
                    </div>

                    <div className="px-2 bg-[#F0F3F4]">
                      <div className="flex justify-between">
                        <div>Composite Unit of Measure</div>
                        <div contentEditable>
                          {item["Unit Detail"]["Composite Unit of Measure"]}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second Column */}
                  <div className="border border-white">
                    <div className="bg-[#E4E9EB]">
                      <h5 className="font-semibold">Contact Information</h5>
                    </div>

                    <div className="px-2 bg-[#F0F3F4]">
                      {Object.entries(item["Contact Information"]).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <div>{key}</div>
                          <div contentEditable>{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Third Column */}
                  {item["Forecast Schedule"].map((forecast, index) => (
                    <div
                      className="border border-white"
                      key={index}
                      onMouseEnter={(e) => {
                        // Show he Hidden Icons
                        const icons = e.currentTarget.querySelector("span");
                        icons?.classList.remove("hidden");
                        icons?.classList.add("flex");
                      }}
                      onMouseLeave={(e) => {
                        // Hide the Hidden Icons
                        const icons = e.currentTarget.querySelector("span");
                        icons?.classList.add("hidden");
                        icons?.classList.remove("flex");
                      }}
                    >
                      <div className="bg-[#E4E9EB] flex justify-between">
                        <h5 className="font-semibold">Forecast Schedule</h5>
                        <span className="hidden">
                          <HiMinus
                            className="cursor-pointer w-6 h-6 text-black"
                            onClick={() => deleteForecastSchedule(item.id, index)}
                          />
                        </span>
                      </div>

                      <div className="px-2 bg-[#F0F3F4]">
                        <>
                          {Object.entries(forecast).map(
                            ([key, value]) =>
                              key !== "id" && (
                                <div key={key} className="flex justify-between">
                                  <div>{key}</div>
                                  <div contentEditable>{value}</div>
                                </div>
                              )
                          )}
                        </>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Third Column - Third Row */}
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default Layout_2;
