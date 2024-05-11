/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type RenderTableProps = {
  items: EDI850LayoutOne[];
  setItems: React.Dispatch<React.SetStateAction<EDI850LayoutOne[]>>;
};

const RenderTable = ({ items, setItems }: RenderTableProps): JSX.Element => {
  const [forecastId, setForecaseId] = useState<string>("");

  useEffect(() => {
    if (forecastId) {
      setItems((prev) => prev.filter((p) => p.id !== forecastId));
      setForecaseId("");
    }
  }, [forecastId, setItems]);

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
          <tr key={index} className="custom-table-row">
            <td contentEditable>{item["Line #"]}</td>
            <td contentEditable>{item["UPC #"]}</td>
            <td contentEditable>{item["Vendor Item #"]}</td>
            <td contentEditable>{item["Description"]}</td>
            <td contentEditable>{item["Qty"]}</td>
            <td contentEditable>{item["UOM"]}</td>
            <td contentEditable>{item["Price"]}</td>
            <td contentEditable>{item["Amount"]}</td>
          </tr>
        )) || null}

        <tr className="custom-table-row w-full">
          <td colSpan={3} />
          <td>
            Total Qty: <span contentEditable>5</span>
          </td>
          <td colSpan={4} />
        </tr>

        <tr>
          <td colSpan={6} />
          <td className="font-bold border-2 border-black">Total</td>
          <td className="border-2 border-black" contentEditable>
            249.45
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Layout_1 = ({ items, setItems }: RenderTableProps): JSX.Element => {
  return (
    <>
      <div className="flex flex-col items-end p-4 gap-y-1">
        <h1 className="text-3xl font-semibold">Purchase Order</h1>

        <h5>Original</h5>
        <h5 contentEditable>New Order</h5>

        <h5 contentEditable className="mt-4">
          Order_12345
        </h5>

        <h5 contentEditable className="mt-4">
          6/16/2020
        </h5>
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
          <h5 contentEditable>DELL</h5>
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
          <td contentEditable></td>
          <td contentEditable></td>
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
          <td contentEditable></td>
          <td contentEditable></td>
          <td contentEditable></td>
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
          <td contentEditable></td>
          <td contentEditable></td>
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
          <td contentEditable></td>
        </tr>
      </table>

      <table className="w-full my-4">
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
          <td contentEditable></td>
          <td contentEditable></td>
          <td contentEditable></td>
          <td contentEditable></td>
        </tr>
      </table>

      <RenderTable items={items} setItems={setItems} />
    </>
  );
};

export default Layout_1;
