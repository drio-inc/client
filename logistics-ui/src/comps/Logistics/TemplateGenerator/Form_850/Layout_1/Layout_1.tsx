/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { HiMinus } from "react-icons/hi";

type RenderTableProps = {
  items: EDI850LayoutOne[];
  setItems: React.Dispatch<React.SetStateAction<EDI850LayoutOne[]>>;
};

const RenderTable = ({ items, setItems }: RenderTableProps): JSX.Element => {
  const deleteItem = (id: string, index: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <table className="w-full table-fixed">
      <thead>
        <tr className="custom-table-row">
          <th>Line #</th>
          <th>UPC #</th>
          <th>Vendor Item #</th>
          <th>Description</th>
          <th>Qty</th>
          <th>UOM</th>
          <th>Price</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
        {items?.map((item, index: number) => (
          <tr
            key={index}
            className="relative custom-table-row"
            onMouseEnter={(e) => {
              // Show he Hidden Icons
              const icons = e.currentTarget.querySelector("#deleteIcon");
              icons?.classList.remove("hidden");
              //   icons?.classList.add("flex");
            }}
            onMouseLeave={(e) => {
              // Hide the Hidden Icons
              const icons = e.currentTarget.querySelector("#deleteIcon");
              icons?.classList.add("hidden");
              icons?.classList.remove("flex");
            }}
          >
            <td contentEditable>{item["Line #"]}</td>
            <td contentEditable>{item["UPC #"]}</td>
            <td contentEditable>{item["Vendor Item #"]}</td>
            <td contentEditable>{item["Description"]}</td>
            <td contentEditable>{item["Qty"]}</td>
            <td contentEditable>{item["UOM"]}</td>
            <td contentEditable>{item["Price"]}</td>
            <td contentEditable>
              <span>{(item["Qty"] * item["Price"]).toFixed(2)}</span>

              <span className="hidden absolute -bottom-6 -right-6 p-2" id="deleteIcon">
                <HiMinus
                  className="cursor-pointer w-8 h-8"
                  onClick={() => deleteItem(item.id, index)}
                />
              </span>
            </td>
          </tr>
        )) || null}

        <tr className="custom-table-row w-full">
          <td colSpan={3} />
          <td>
            Total Qty:{" "}
            <span contentEditable>{items.reduce((acc, cur) => acc + cur["Qty"], 0)}</span>
          </td>
          <td colSpan={4} />
        </tr>

        <tr>
          <td colSpan={6} />
          <td className="font-bold border-2 border-black">Total</td>
          <td className="border-2 border-black" contentEditable>
            {items.reduce((acc, cur) => acc + cur?.["Amount"], 0).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Layout_1 = ({ items, setItems }: RenderTableProps): JSX.Element => {
  return (
    <div className="relative">
      <div className="flex justify-between">
        <div className="px-8">
          <Image src="/acmemfg.png" width={250} height={250} alt={"Acme Logo"} />
        </div>

        <div className="flex flex-col items-end p-4 gap-y-1">
          <h1 className="text-3xl font-semibold">Purchase Order</h1>

          <h5>Original</h5>
          <h5 contentEditable>New Order</h5>

          <h5 contentEditable className="mt-4">
            Order_12345
          </h5>

          <h5 contentEditable className="mt-4">
            5/1/2024
          </h5>
        </div>
      </div>

      <div className="flex justify-between p-4 max-w-6xl mx-auto">
        <div>
          <h5 className="font-bold">Ship To</h5>
          <h5 contentEditable>Acme Inc</h5>
          <h5>
            Code Type: <span contentEditable>Assigned by Buyer or Buyer's Agent</span>
          </h5>
          <h5 contentEditable>
            Code : <span contentEditable>54325</span>
          </h5>

          <h5 className="font-bold">Store:</h5>
          <h5>
            Store #: <span contentEditable>54325</span>
          </h5>
        </div>

        <div>
          <h5 className="font-bold">Ship From</h5>
          <h5 contentEditable>Acme Inc</h5>
          <h5>
            Code Type: <span contentEditable>Assigned by Buyer or Buyer's Agent</span>
          </h5>
          <h5 contentEditable>
            Code : <span contentEditable>54325</span>
          </h5>

          <h5 className="font-bold">Distribution Center:</h5>
          <h5>
            DC #: <span contentEditable>54325</span>
          </h5>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="custom-table-row">
            <th>Release #</th>
            <th>Associated PO #</th>
            <th>Status</th>
            <th>Do Not Ship Before</th>
          </tr>
        </thead>

        <tr className="custom-table-row">
          <td contentEditable>4783291</td>
          <td contentEditable>2024050</td>
          <td contentEditable>In Process</td>
          <td contentEditable>5/6/2024</td>
        </tr>
      </table>

      <table className="w-full">
        <thead>
          <tr className="custom-table-row">
            <th>Do Not Ship After</th>
            <th>Ship Date</th>
            <th>Requested Delivery</th>
            <th>Routing Sequence</th>
            <th>Transportation Method</th>
          </tr>
        </thead>

        <tr className="custom-table-row">
          <td contentEditable>5/10/2024</td>
          <td contentEditable>5/08/2024</td>
          <td contentEditable>5/12/2024</td>
          <td contentEditable>Origin Carrier, Shipper's Routing (Rail),</td>
          <td contentEditable>Best Way(Shippers Option)</td>
        </tr>
      </table>

      <table className="w-full">
        <thead>
          <tr className="custom-table-row">
            <th>SCAC</th>
            <th>Routing</th>
            <th>Service Delivery</th>
            <th>Backorder</th>
          </tr>
        </thead>

        <tr className="custom-table-row">
          <td contentEditable>USPS</td>
          <td contentEditable>UPS GROUND</td>
          <td contentEditable>Ground</td>
          <td contentEditable>No Back Order</td>
        </tr>
      </table>

      <table className="w-full">
        <thead>
          <tr className="custom-table-row">
            <th>Currency</th>
            <th>Customer #</th>
            <th>Promotion #</th>
          </tr>
        </thead>

        <tr className="custom-table-row">
          <td contentEditable>U.S. Dollars</td>
          <td contentEditable>54313451</td>
          <td contentEditable>Currency Discount</td>
        </tr>
      </table>

      <table className="w-full mt-8 mb-4">
        <thead>
          <tr className="custom-table-row bg-gray-200 text-center">
            <td colSpan={4}>FOB</td>
          </tr>

          <tr className="custom-table-row">
            <th>Method of Payment</th>
            <th>Transportation Terms</th>
            <th>Location #</th>
            <th>Description</th>
          </tr>
        </thead>

        <tr className="custom-table-row">
          <td contentEditable>Collect</td>
          <td contentEditable>Cost and Freight</td>
          <td contentEditable>Nearest Cross Street</td>
          <td contentEditable></td>
        </tr>
      </table>

      <RenderTable items={items} setItems={setItems} />

      <span className="text-[8px] text-gray-500 absolute inline-block">Created by Drio Inc.</span>
    </div>
  );
};

export default Layout_1;
