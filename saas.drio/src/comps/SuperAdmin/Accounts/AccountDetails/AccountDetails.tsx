import Layout from "@/comps/Layout";
import { HiX } from "react-icons/hi";
import { setCloseModal } from "@/state/slices/uiSlice";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { useGetAccountByIdQuery } from "@/api/resources/accounts";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

export default function AccountDetails({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetAccountByIdQuery(row.id);

  if (isLoading) return <StaticLoader />;

  console.log(data);

  return (
    <Layout>
      <div className="xl:w-[50vw] relative w-[90vw] mx-auto bg-white p-8 rounded-lg">
        <h2 className="text-gray-700 text-2xl font-bold mb-4">
          Account Information
        </h2>

        <div className="flex flex-col md:flex-row my-4 shadow-md p-2 rounded-lg bg-gray-50 text-gray-500 text-xs md:text-base">
          <div className="w-full">
            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">Account Status </span>
              <span className="block">: {row.status}</span>
            </div>

            <div className="flex">
              <span className="block w-1/2 font-semibold">Address </span>
              <span className="block">
                : {row.country}, {row.state}, {row.city}
              </span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">Contact Number </span>
              <span className="block">: 408-555-1212</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">Contact Email</span>
              <span className="block">: {data?.users[0].email}</span>
            </div>
          </div>

          <div className="w-full border-t md:border-none border-gray-200 mt-4 md:mt-0">
            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">
                Root Admin Name{" "}
              </span>
              <span className="block">
                : {data?.users[0].first_name}{" "}
                {data?.users[0].last_name.substring(0, 1)}.
              </span>
            </div>

            {/* <div className="flex my-2">
              <span className="block w-1/2 font-semibold">
                Admin Activation Link
              </span>
              <span className="block w-1/2">
                :http://activate.drio.com/ 54AC783041944DAB21
              </span>
            </div> */}
          </div>
        </div>

        <h2 className="text-gray-700 text-2xl font-bold mb-4">
          Account Resources
        </h2>

        <div className="flex flex-col md:flex-row my-4 shadow-md p-2 rounded-lg bg-gray-50 text-gray-500 text-xs md:text-base">
          <div className="w-full">
            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">
                #Organization Units{" "}
              </span>
              <span className="block">: {data?.organization_units.length}</span>
            </div>

            <div className="flex">
              <span className="block w-1/2 font-semibold">#DDX Clusters</span>
              <span className="block">: {row.ddxClusters}</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">Cluster Size </span>
              <span className="block">: {row.ddxClusters}</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">
                #Legal Agreements
              </span>
              <span className="block">: 4</span>
            </div>
          </div>

          <div className="w-full border-t md:border-none border-gray-200 mt-4 md:mt-0">
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
              <span className="block w-1/2">: {row.datasetsPublished}</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">#Contracts</span>
              <span className="block w-1/2">: {row.contracts}</span>
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
