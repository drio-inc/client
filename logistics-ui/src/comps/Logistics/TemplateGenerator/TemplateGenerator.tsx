/* eslint-disable react/no-unescaped-entities */

import { useRef } from "react";
import Button from "@/comps/ui/Button";
import ReactToPrint from "react-to-print";
import { TextInput } from "@/comps/ui/Forms/Inputs";

const TemplateGenerator = () => {
  const printRef = useRef(null);

  return (
    <div>
      <ReactToPrint
        content={() => printRef.current}
        trigger={() => <Button className="mb-8">Print Document</Button>}
      />

      <div className="bg-white p-4" ref={printRef}>
        <div className="flex flex-col items-end p-4 gap-y-1">
          <h1 className="text-3xl font-semibold">
            Planning Schedule with Release Capacity
          </h1>

          <h5>Set Purpose Code</h5>
          <h5>Mutually Defined</h5>
          <h5>Reference ID</h5>
          <h5>1514893</h5>

          <div className="mt-4">
            <h5 className="font-bold">Start Date</h5>
            <h5>6/16/2020</h5>
          </div>
        </div>

        <div className="flex flex-col p-4 gap-y-1 my-4">
          <h5 className="font-bold">Carrier</h5>
          <h5>Code: USPN</h5>
          <h5 className="font-bold">Ship To</h5>
          <h5>DC #1A</h5>
          <h5>Code: 043849</h5>
        </div>

        <table className="w-full my-4">
          <thead>
            <tr>
              <th className="border-2 border-black bg-gray-200">
                Schedule Type
              </th>
              <th className="border-2 border-black bg-gray-200">
                Schedule Qty Code
              </th>
              <th className="border-2 border-black bg-gray-200">
                Supplier Code
              </th>
            </tr>
          </thead>

          <tr>
            <td className="border-2 border-black">Planned Shipment Based</td>
            <td className="border-2 border-black">
              Actual Discrete Quantities
            </td>
            <td className="border-2 border-black">434</td>
          </tr>
        </table>

        <table className="w-full border-2 border-black">
          <thead>
            <tr className="table-row">
              <th className="">Volex Item #</th>
              <th className="">Item Description</th>
              <th className="">UOM</th>
            </tr>
          </thead>

          <tr>
            <td className="border-t-2 border-l-2 borer-r-2 border-black">
              430900
            </td>
            <td className="border-t-2 border-l-2 borer-r-2 border-black">
              3" Widget
            </td>
            <td className="border-t-2 border-l-2 borer-r-2 border-black">
              Each
            </td>
          </tr>

          <tr>
            <td colSpan={3}>
              <table className="w-[95%] ml-auto">
                <tr className="table-row">
                  <th>Forecast Code</th>
                  <th>Interval Grouping of Forecast</th>
                  <th>Qty</th>
                  <th>Forecast Date Load</th>
                  <th>Warehouse Location ID</th>
                </tr>

                <tr className="table-row">
                  <td>Firm</td>
                  <td></td>
                  <td>200</td>
                  <td>6/23/2020</td>
                  <td>1A</td>
                </tr>

                <tr className="table-row">
                  <td>Planning</td>
                  <td></td>
                  <td>100</td>
                  <td>6/30/2020</td>
                  <td>1A</td>
                </tr>

                <tr className="table-row">
                  <td>Planning</td>
                  <td></td>
                  <td>100</td>
                  <td>7/14/2020</td>
                  <td>1A</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td className="border-l-2 borer-r-2 border-black">300100</td>
            <td className="border-l-2 borer-r-2 border-black">3" Widget</td>
            <td className="border-l-2 borer-r-2 border-black">Each</td>
          </tr>

          <tr>
            <td colSpan={3}>
              <table className="w-[95%] ml-auto">
                <tr className="table-row">
                  <th>Forecast Code</th>
                  <th>Interval Grouping of Forecast</th>
                  <th>Qty</th>
                  <th>Forecast Date Load</th>
                  <th>Warehouse Location ID</th>
                </tr>

                <tr className="table-row">
                  <td>Firm</td>
                  <td></td>
                  <td>200</td>
                  <td>6/23/2020</td>
                  <td>1A</td>
                </tr>

                <tr className="table-row">
                  <td>Planning</td>
                  <td></td>
                  <td>100</td>
                  <td>6/30/2020</td>
                  <td>1A</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default TemplateGenerator;
