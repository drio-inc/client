/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { useState } from "react";
import { HiMinus } from "react-icons/hi";

type RenderTableProps = {
  items: EDI810LayoutOne[];
  setItems: React.Dispatch<React.SetStateAction<EDI810LayoutOne[]>>;
};

const RenderTable = ({ items, setItems }: RenderTableProps): JSX.Element => {
  const [shippingCost, setShippingCost] = useState<number>(50);
  const [otherChargeAmount, setOtherChargeAmount] = useState<number>(10);

  const deleteItem = (id: string, index: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="custom-table-row">
          <th>Line #</th>
          <th>Buyer's Part #</th>
          <th>Vendor Item #</th>
          <th>Description</th>
          <th>Quantity</th>
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
            <td contentEditable>{item["Buyer's Part #"]}</td>
            <td contentEditable>{item["Vendor Item #"]}</td>

            <td>
              {item["Description"]
                ? Object.entries(item["Description"]).map(([key, value], index) => (
                    <div
                      key={key}
                      contentEditable
                      className={`flex justify-start text-left ${
                        index === 2 && "border-b-2 !-mx-[3px] border-black"
                      }`}
                    >
                      <span className={`${index === 2 && "ml-[3px]"}`}>
                        {key}: {value}
                      </span>
                      <br />
                    </div>
                  ))
                : "N/A"}
            </td>

            <td contentEditable>{item["Qty"]}</td>
            <td contentEditable>{item["UOM"]}</td>
            <td contentEditable>${item["Price"]}</td>
            <td contentEditable>
              <span>${(item["Qty"] * item["Price"]).toFixed(2)}</span>

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
            <div className="flex flex-col items-start">
              <span>Shipping Cost: {shippingCost}; </span>
              <span>Other Charge Amount: {otherChargeAmount};</span>
              <span>Other Charge Description: Handling fee</span>
            </div>
          </td>

          <td colSpan={4} />
        </tr>

        <tr>
          <td colSpan={6} />
          <td className="font-bold border-2 border-black">Total</td>
          <td className="border-2 border-black" contentEditable>
            $
            {(
              items.reduce((acc, cur) => acc + cur?.["Amount"], 0) +
              shippingCost +
              otherChargeAmount
            ).toFixed(2)}
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
          <h1 className="text-3xl font-semibold" contentEditable>
            Invoice
          </h1>

          <h5 contentEditable>INV00000156</h5>
          <h5 contentEditable>5/1/2024</h5>
        </div>
      </div>

      <div className="flex flex-col p-4 max-w-6xl ml-8">
        <h5 className="font-bold">Ship To</h5>
        <h5 contentEditable>Acme Inc</h5>
        <h5 contentEditable>
          123 Main Street
          <br />
          <span>Springfield, IL 62701 USA</span>
        </h5>

        <h5>
          Code : <span contentEditable>54325</span>
        </h5>
      </div>

      <table className="w-full table-fixed mb-8">
        <thead>
          <tr className="custom-table-row">
            <th>PO #</th>
            <th>Ship Date</th>
            <th>Vendor #</th>
          </tr>
        </thead>

        <tr className="custom-table-row">
          <td contentEditable>2024050</td>
          <td contentEditable>5/08/2024</td>
          <td contentEditable>98098</td>
        </tr>
      </table>

      <RenderTable items={items} setItems={setItems} />

      <span className="text-[8px] text-gray-500 absolute inline-block">Created by Drio Inc.</span>
    </div>
  );
};

export default Layout_1;
