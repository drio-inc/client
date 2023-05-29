import Layout from "@/comps/Layout";
import Button from "@/comps/ui/Button/Button";
import { useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

import { HiX } from "react-icons/hi";

export default function DDXDetails({ row }: TableRow) {
  const dispatch = useAppDispatch();
  return (
    <>
      <Layout>
        <div className="min-w-[60vw] relative w-full mx-auto bg-white p-8 rounded-lg">
          <h2 className="text-gray-700 text-base font-bold mb-4">
            {row.account}
          </h2>

          <div className="flex justify-between">
            <h3 className="text-gray-500 font-semibold">System Details</h3>
            <Button
              intent={`tertiary`}
              onClick={() => {
                dispatch(setCloseModal("detailsWindow"));
                dispatch(setOpenModal("addDDXForm"));
              }}
            >
              + Add DDX
            </Button>
          </div>

          <div className="flex my-4 shadow-md p-2 rounded-lg bg-gray-50 text-gray-500">
            <div className="w-2/3 flex-grow">
              <div className="flex my-2">
                <span className="block w-1/2">Docker image</span>
                <span className="block">:Standard Rev 1.0.2.1102023</span>
              </div>

              <div className="flex">
                <span className="block w-1/2">Licensed</span>
                <span className="block">:Yes ( Standard )</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">
                  Data rate sent to controller
                </span>
                <span className="block">:1200/sec</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Avg Access Rates(24 hrs)</span>
                <span className="block">:24/day</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Transfer rate</span>
                <span className="block">:2 Gbps</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Dataset rate</span>
                <span className="block">:5 Datasets/sec</span>
              </div>
            </div>

            <div className="w-1/3">
              <h3 className="mb-3">DDX Cluster Provisioning</h3>
              <div className="flex my-2">
                <span className="block w-1/2">#vCPU</span>
                <span className="block">:30</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Memory</span>
                <span className="block w-1/2">:500 GB</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Storage</span>
                <span className="block w-1/2">:1 TB</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Auto-scale</span>
                <span className="block w-1/2">:ON</span>
              </div>
            </div>

            <div className="w-1/3">
              <h3 className="mb-3">System Utilization</h3>
              <div className="flex my-2">
                <span className="block w-1/2">CPU</span>
                <span className="block">:30 %</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Memory</span>
                <span className="block w-1/2">:83 %</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Storage</span>
                <span className="block w-1/2">:12 %</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Auto-scale</span>
                <span className="block w-1/2">:ON</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <h2 className="text-gray-500 font-medium">Deployment details</h2>
            <Button
              intent={`tertiary`}
              onClick={() => {
                dispatch(setCloseModal("detailsWindow"));
                dispatch(setOpenModal("addDDXForm"));
              }}
            >
              + Rollover Key
            </Button>
          </div>

          <div className="flex my-4 shadow-md p-2 rounded-lg bg-gray-50 text-gray-500">
            <div className="">
              <div className="flex my-2">
                <span className="block w-1/2">Service Provider</span>
                <span className="block">: Datacenter</span>
              </div>

              <div className="flex">
                <span className="block w-1/2">Location</span>
                <span className="block">: Santa Clara</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Region</span>
                <span className="block">: US West</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Rack</span>
                <span className="block">: 22</span>
              </div>

              <div className="flex my-2">
                <span className="block w-1/2">Subnet</span>
                <span className="block">: 10.02</span>
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
