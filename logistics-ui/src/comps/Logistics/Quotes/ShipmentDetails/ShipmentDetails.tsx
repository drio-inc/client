import { ChangeEvent } from "react";
import { useRouter } from "next/router";
import { HiSearch } from "react-icons/hi";
import { StatelessSelectInput } from "@/comps/ui/Forms/Inputs";
import { setselectedItem } from "@/state/slices/inventorySlice";
import dealer_to_destination from "@data/dealer_to_destination.json";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

const ShipmentDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.inventory);

  const handleProductChange = (option: ChangeEvent<HTMLSelectElement>) => {
    const findProduct = products.rows.find((p) => p.orderId === option);
    dispatch(setselectedItem(findProduct));
  };

  return (
    <div className={"flex flex-col w-full bg-gray-50 mb-6"}>
      <div className="flex justify-between items-center">
        <h2 className="text-gray-700 font-semibold text-2xl p-4">
          Shipment Details
        </h2>

        <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
          <div className="relative flex w-full flex-wrap items-center">
            <HiSearch className="text-gray-400 inline-flex h-full absolute items-center justify-center w-8 pl-2 py-2" />
            <input
              placeholder="Search for a product"
              className="pl-10 transition-colors ease-in-out duration-200 border py-2 px-3 my-1 rounded-md focus:outline-none shadow-sm"
            />
          </div>
        </form>
      </div>

      <div className={`bg-white flex flex-wrap items-center justify-between`}>
        <div className="w-full flex flex-col md:flex-row flex-wrap gap-x-4 justify-between p-4">
          <div className="md:flex-1">
            <StatelessSelectInput
              label={"Order ID"}
              placeholder={"All"}
              registerName="orderID"
              onChange={(option) => handleProductChange(option)}
              defaultSelectedValue={{
                label: products.selectedItem?.orderId ?? "All",
                value: products.selectedItem?.orderId ?? "All",
              }}
              options={products.rows.map((product) => ({
                label: product.orderId,
                value: product.orderId,
              }))}
            />
          </div>

          <div className="flex flex-col md:flex-1 gap-y-2">
            <span className="text-gray-700 font-bold">Name</span>
            <div className="rounded-md border border-gray-300 p-4">
              <span className="text-[#4C566A]">
                {products.selectedItem?.name ?? "All"}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-1 gap-y-2">
            <span className="text-gray-700 font-bold">SKU</span>
            <div className="rounded-md border border-gray-300 p-4">
              <span className="text-[#4C566A]">
                {products.selectedItem?.sku ?? "All"}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-1 gap-y-2">
            <span className="text-gray-700 font-bold">From</span>
            <div className="rounded-md border border-gray-300 p-4">
              <span className="text-[#4C566A]">
                {products.selectedItem?.inventoryLocation ?? "All"}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-1 gap-y-2">
            <span className="text-gray-700 font-bold">To</span>
            <div className="rounded-md border border-gray-300 p-4">
              <span className="text-[#4C566A]">
                {dealer_to_destination[
                  products.selectedItem
                    ?.dealerName as keyof typeof dealer_to_destination
                ]?.delivery_address ?? "ALL"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
