import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { useRouter } from "next/router";
import { removeModalId, setCloseModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

export default function ConfirmQuote({ row }: TableRow) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedItem } = useAppSelector((state) => state.inventory);

  const bookQuote = () => {
    dispatch(removeModalId());
    router.push("/tracking");
  };

  const productDetails = {
    sku: selectedItem?.sku,
    name: selectedItem?.name,
    to: selectedItem?.shipToLocation,
    "order id": selectedItem?.orderId,
    from: selectedItem?.inventoryLocation,
  };

  return (
    <Layout>
      <div className="mx-auto bg-white p-8 rounded-lg">
        <h2 className="text-gray-700 text-2xl font-bold text-center">
          Confirm Quote
        </h2>

        <p className="text-center text-[#4C566A] text-sm my-2">
          Please verify the following shipment and quote details before booking.
        </p>

        <div className="flex flex-col my-4 text-gray-700 text-sm gap-y-2 shadow-sm border rounded-md bg-indigo-50 p-4">
          <div className="border-b border-gray-300 pb-[6px]">
            <h3 className="text-[16px] font-semibold">Shipment Details</h3>
          </div>

          {productDetails &&
            Object.entries(productDetails).map(([key, value]) => (
              <div className="flex gap-x-2" key={key}>
                <span className="capitalize font-medium">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 my-4 text-gray-700 text-sm gap-y-2 shadow-sm border rounded-md bg-indigo-50 p-4">
          <div className="lg:col-span-2 border-b border-gray-300 pb-[6px]">
            <h3 className="text-[16px] font-semibold">Quote Details</h3>
          </div>
          {row &&
            Object.entries(row).map(([key, value]) => (
              <div className="flex gap-x-2" key={key}>
                <span className="capitalize font-medium">{key}:</span>
                <span>{value as string}</span>
              </div>
            ))}
        </div>

        <div className="flex gap-x-2 justify-center w-full mt-4">
          <Button
            type="button"
            className="w-full"
            intent={`secondary`}
            onClick={() => dispatch(removeModalId())}
          >
            <span className="inline-flex justify-center w-full">Cancel</span>
          </Button>

          <Button intent={`primary`} className="w-full" onClick={bookQuote}>
            Confirm
          </Button>
        </div>
      </div>
    </Layout>
  );
}
