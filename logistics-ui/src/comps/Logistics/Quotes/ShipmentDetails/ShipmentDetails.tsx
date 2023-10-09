import { useRouter } from "next/router";
import { HiSearch } from "react-icons/hi";

const ShipmentDetails = () => {
  const router = useRouter();

  const { id, name, sku, from } = router.query;

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
        <div className="w-full flex flex-wrap gap-x-4 justify-between p-4">
          <div className="flex flex-col flex-1 gap-y-2">
            <span className="text-gray-700 font-bold">Name</span>
            <div className="rounded-md border border-gray-300 p-4">
              <span className="text-[#4C566A]">{name}</span>
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-y-2">
            <span className="text-gray-700 font-bold">Type</span>
            <div className="rounded-md border border-gray-300 p-4">
              <span className="text-[#4C566A]">Motorcycle (SKU {sku})</span>
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-y-2">
            <span className="text-gray-700 font-bold">From</span>
            <div className="rounded-md border border-gray-300 p-4">
              <span className="text-[#4C566A]">
                Harley Davidson Factory, {from}
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-1 gap-y-2">
            <span className="text-gray-700 font-bold">To</span>
            <div className="rounded-md border border-gray-300 p-4">
              <span className="text-[#4C566A]">ABC Dealer, San Francisco</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
