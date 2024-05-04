import Image from "next/image";

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

const Layout_2 = () => {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold mb-2 text-center">Tesla Motors</h3>
          <Image src="/tesla.png" width={200} height={200} alt={"Tesla Logo"} />
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
          <div className="h-full bg-[#F0F3F4]"></div>
        </div>
      </div>

      {/* Second Row */}
      <div>
        <div className="bg-[#003569] px-2 py-1">
          <h5 className="font-semibold text-white">Address Information</h5>
        </div>

        <div className="grid grid-cols-3 gap-x-1">
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
          <div className="h-full bg-[#F0F3F4]"></div>
        </div>
      </div>

      {/* <RenderTable data={items} setItems={setItems} /> */}
    </>
  );
};

export default Layout_2;
