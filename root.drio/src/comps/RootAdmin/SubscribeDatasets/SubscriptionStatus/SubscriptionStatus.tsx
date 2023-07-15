import Button from "@ui/Button";
import Layout from "@/comps/Layout";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { HiUpload, HiOutlineDuplicate, HiX } from "react-icons/hi";

export default function SubscriptionStatus({ row }: TableRow) {
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <div className="mx-auto bg-white py-4 px-6 rounded-lg min-w-[60vw]">
        <div className="flex justify-between">
          <h2 className="text-gray-700 text-2xl font-bold">
            Status of Subscription
          </h2>
          <button onClick={() => dispatch(setCloseModal(`subscriptionStatus`))}>
            <HiX className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-wrap justify-between -m-2 gap-2 rounded-lg my-4 bg-gray-50 border px-2 py-4 shadow-sm">
          <div className="px-4 py-2 w-[34rem] flex items-center gap-x-2 bg-white border rounded-md">
            <label className="font-bold text-gray-700">
              Subscription Status for Dataset:
            </label>
            <span>Mkt Data</span>
          </div>

          <div className="px-4 py-2 w-[34rem] flex items-center gap-x-2 bg-white border rounded-md">
            <label className="font-bold text-gray-700">Owned By</label>
            <span>Vin Solution</span>
          </div>

          <div className="px-4 py-2 w-[34rem] flex items-center gap-x-2 bg-white border rounded-md">
            <label className="font-bold text-gray-700">
              Subscription Request Sent On:
            </label>
            <span>11/07/2022 at 12:10:07</span>
          </div>

          <div className="px-4 py-2 w-[34rem] flex items-center gap-x-2 bg-white border rounded-md">
            <label className="font-bold text-gray-700">Status</label>
            <span>In progress</span>
          </div>
        </div>

        <div className="flex flex-wrap flex-col justify-between -m-2 gap-x-2 gap-y-6 rounded-lg my-4 bg-gray-50 border px-2 py-4 shadow-sm">
          <div className="flex flex-col gap-y-2">
            <h3>Request Details:</h3>
            <div className="relative px-4 py-2 w-full flex flex-col gap-x-2 bg-white border rounded-md">
              <span className="font-bold">Request in Queue:</span>
              <span>15 Days</span>
            </div>

            <div className="relative px-4 py-2 w-full flex flex-col gap-x-2 bg-white border rounded-md">
              <span className="font-bold">Request Seen on:</span>
              <span>11/12/2022</span>
            </div>

            <div className="relative px-4 py-2 w-full flex flex-col gap-x-2 bg-white border rounded-md">
              <span className="font-bold">
                Contract and personas Viewed on:
              </span>
              <span>11/12/2022</span>
            </div>

            <div className="relative px-4 py-2 w-full flex flex-col gap-x-2 bg-white border rounded-md">
              <span className="font-bold">Approval:</span>
              <span>Approved</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
