/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

interface Layout2Props {
  items: ShippingDocument;
  setItems: React.Dispatch<React.SetStateAction<ShippingDocument>>;
}

const Layout_2 = ({ items, setItems }: Layout2Props) => {
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
        <div className="bg-[#003569] px-2 py-1">
          <h5 className="font-semibold text-white">Document Information</h5>
        </div>

        <div className="grid grid-cols-3 gap-x-1">
          {/* First Column */}
          <div>
            <div className="bg-[#E4E9EB]">
              <h5 className="font-semibold px-2">Planning Schedule Information</h5>
            </div>

            <div className="px-2 bg-[#F0F3F4]">
              {Object.entries(items.documentInformation).map(([key, value]) => (
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
              {Object.entries(items.referenceInformation).map(([key, value]) => (
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
              {Object.entries(items.shipFromInformation).map(([key, value]) => (
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
              {Object.entries(items.shipToInformation).map(([key, value]) => (
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
      <div>
        <div className="bg-[#003569] px-2 py-1">
          <h5 className="font-semibold text-white">Item Detail</h5>
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
            <h5 contentEditable>00010</h5>
          </div>

          {/* Third Column(Grid) */}
          <div className="h-full bg-[#F0F3F4]">
            {/* Third Column - First Row */}
            <div className="flex gap-x-16 border border-white">
              <h5>Buyer's Part Number</h5>
              <span contentEditable>1069845-22-B</span>
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
                    <div contentEditable>Each</div>
                  </div>
                </div>
              </div>

              {/* Second Column */}
              <div className="border border-white">
                <div className="bg-[#E4E9EB]">
                  <h5 className="font-semibold">Contact Information</h5>
                </div>

                <div className="px-2 bg-[#F0F3F4]">
                  {Object.entries(items.contactInformation).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <div>{key}</div>
                      <div contentEditable>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Third Column */}
              <div className="border border-white">
                <div className="bg-[#E4E9EB]">
                  <h5 className="font-semibold">Forecast Schedule</h5>
                </div>

                <div className="px-2 bg-[#F0F3F4]">
                  {Object.entries(items.forecastSchedule).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <div>{key}</div>
                      <div contentEditable>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Third Column - Third Row */}
            <div className="grid grid-cols-3">
              {/* First Column */}
              <div className="border border-white">
                <div className="bg-[#E4E9EB]">
                  <h5 className="font-semibold">Forecast Schedule</h5>
                </div>

                <div className="px-2 bg-[#F0F3F4]">
                  {Object.entries(items.forecastSchedule).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <div>{key}</div>
                      <div contentEditable>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Second Column */}
              <div className="border border-white">
                <div className="bg-[#E4E9EB]">
                  <h5 className="font-semibold">Forecast Schedule</h5>
                </div>

                <div className="px-2 bg-[#F0F3F4]">
                  {Object.entries(items.forecastSchedule).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <div>{key}</div>
                      <div contentEditable>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Third Column */}
              <div className="border border-white">
                <div className="bg-[#E4E9EB]">
                  <h5 className="font-semibold">Forecast Schedule</h5>
                </div>

                <div className="px-2 bg-[#F0F3F4]">
                  {Object.entries(items.forecastSchedule).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <div>{key}</div>
                      <div contentEditable>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout_2;
