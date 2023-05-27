import Layout from "@/comps/Layout";
import { useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";

import { HiX } from "react-icons/hi";

export default function AccountDetails({ row }: TableRow) {
  const dispatch = useAppDispatch();
  return (
    <>
      <Layout>
        <div className="min-w-[50vw] relative w-full mx-auto bg-white p-8 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-bold mb-4">
            Account Information
          </h2>
          <div className="flex my-4 shadow-md p-2 rounded-lg bg-gray-50 text-gray-500">
            <div className="w-full">
              <div className="flex my-2">
                <span className="block w-1/2">Account Status </span>
                <span className="block">:Not Activated</span>
              </div>

              <div className="flex">
                <span className="block w-1/2">Address </span>
                <span className="block">:311 Stone Rd, CA 92211</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Contact Number </span>
                <span className="block">:408-555-1212</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Contact Email </span>
                <span className="block">:contact@ymail.com</span>
              </div>
            </div>

            <div className="w-full">
              <div className="flex my-2">
                <span className="block w-1/2">Root Admin Name </span>
                <span className="block">:Dilip K</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Admin Activation Link</span>
                <span className="block w-1/2">
                  :http://activate.drio.com/ 54AC783041944DAB21
                </span>
              </div>
            </div>
          </div>

          <h2 className="text-gray-700 font-medium">Account Resources</h2>

          <div className="flex my-4 shadow-md p-2 rounded-lg bg-gray-50 text-gray-500">
            <div className="w-full">
              <div className="flex my-2">
                <span className="block w-1/2">#Organization Units </span>
                <span className="block">:25</span>
              </div>

              <div className="flex">
                <span className="block w-1/2">#DDXs </span>
                <span className="block">:5</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Custer Size </span>
                <span className="block">:2</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">#Legal Agreements</span>
                <span className="block">:4</span>
              </div>
            </div>

            <div className="w-full">
              <div className="flex my-2">
                <span className="block w-1/2">License Expire Date</span>
                <span className="block">:12/31/2023</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">#Datasets Published</span>
                <span className="block w-1/2">:57</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">#Subscribers</span>
                <span className="block w-1/2">:256</span>
              </div>
            </div>
          </div>

          <span
            onClick={() => dispatch(setCloseModal("detailsWindow"))}
            className="absolute top-0 right-0 p-6 cursor-pointer"
          >
            <HiX className="w-6 h-6" />
          </span>
        </div>
      </Layout>
    </>
  );
}
