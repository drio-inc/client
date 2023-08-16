import Layout from "@/comps/Layout";
import { HiX } from "react-icons/hi";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import { setCloseModal } from "@/state/slices/uiSlice";

export default function AccountDetails({ row }: TableRow) {
  const dispatch = useAppDispatch();
  return (
    <Layout>
      <div className="min-w-[50vw] relative w-full mx-auto bg-white p-8 rounded-lg">
        <h2 className="text-gray-700 text-2xl font-bold mb-4">
          Account Information
        </h2>
        <div className="flex my-4 shadow-md p-2 rounded-lg bg-gray-50 text-gray-500">
          <div className="w-full">
            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">Account Status </span>
              <span className="block">:Not Activated</span>
            </div>

            <div className="flex">
              <span className="block w-1/2 font-semibold">Address </span>
              <span className="block">:311 Stone Rd, CA 92211</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">Contact Number </span>
              <span className="block">:408-555-1212</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">Contact Email </span>
              <span className="block">:contact@ymail.com</span>
            </div>
          </div>

          <div className="w-full">
            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">
                Root Admin Name{" "}
              </span>
              <span className="block">:Dilip K</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">
                Admin Activation Link
              </span>
              <span className="block w-1/2">
                :http://activate.drio.com/ 54AC783041944DAB21
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-gray-700 text-2xl font-bold mb-4">
          Account Resources
        </h2>

        <div className="flex my-4 shadow-md p-2 rounded-lg bg-gray-50 text-gray-500">
          <div className="w-full">
            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">
                #Organization Units{" "}
              </span>
              <span className="block">:25</span>
            </div>

            <div className="flex">
              <span className="block w-1/2 font-semibold">#DDXs </span>
              <span className="block">:5</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">Cluster Size </span>
              <span className="block">:2</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">
                #Legal Agreements
              </span>
              <span className="block">:4</span>
            </div>
          </div>

          <div className="w-full">
            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">
                License Expire Date
              </span>
              <span className="block">:12/31/2023</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">
                #Datasets Published
              </span>
              <span className="block w-1/2">:57</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">#Subscribers</span>
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
  );
}
