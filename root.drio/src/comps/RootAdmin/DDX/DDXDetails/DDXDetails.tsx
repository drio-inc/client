import Layout from "@/comps/Layout";
import Button from "@/comps/ui/Button/Button";
import { useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

import { HiX } from "react-icons/hi";

const SystemDetails = [
  {
    defaults: [
      {
        name: "dockerImage",
        label: "Docker image",
        value: "Standard Rev 1.0.2.1102023",
      },
      {
        name: "licensed",
        label: "Licensed",
        value: "Yes",
      },
      {
        name: "dataRate",
        label: "Data Rate sent to controller",
        value: "1200/sec",
      },
      {
        name: "avgAccessRate",
        label: "Average Access Rate",
        value: "24/day",
      },
      {
        name: "transferRate",
        label: "Transfer Rate",
        value: "2 Gbps",
      },
      {
        name: "datasetRate",
        label: "Dataset Rate",
        value: "5 Datasets/sec",
      },
    ],

    provisioning: [
      {
        name: "vCPU",
        label: "#vCPU",
        value: "30",
      },
      {
        name: "memory",
        label: "Memory",
        value: "64 GB",
      },
      {
        name: "storage",
        label: "Storage",
        value: "1 TB",
      },
      {
        name: "autoScale",
        label: "Auto-scale",
        value: "ON",
      },
    ],

    utilization: [
      {
        name: "cpu",
        label: "CPU",
        value: "30%",
      },
      {
        name: "memory",
        label: "Memory",
        value: "64%",
      },
      {
        name: "storage",
        label: "Storage",
        value: "12%",
      },
      {
        name: "autoScale",
        label: "Auto-scale",
        value: "ON",
      },
    ],
  },
];

const DeploymentDetails = [
  {
    name: "serviceProvider",
    label: "Service Provider",
    value: "AWS",
  },

  {
    name: "region",
    label: "Region",
    value: "us-east-1",
  },
  {
    name: "location",
    label: "Location",
    value: "US East (N. Virginia)",
  },

  {
    name: "rack",
    label: "Rack",
    value: "1",
  },
  {
    name: "subnet",
    label: "Subnet",
    value: "1",
  },
];

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

          <div className="flex justify-between gap-x-4 my-4 shadow-md p-2 rounded-lg bg-gray-50 text-gray-500">
            <div className="flex flex-col w-2/3">
              {SystemDetails[0].defaults.map((field) => (
                <div className="flex my-2" key={field.name}>
                  <span className="block w-1/2 font-bold">{field.label}</span>
                  <span className="block">:{field.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col w-1/3">
              <h3 className="my-2 font-bold">Cluster Provisioning</h3>
              {SystemDetails[0].provisioning.map((field) => (
                <div className="flex my-2" key={field.name}>
                  <span className="block w-1/2 font-bold">{field.label}</span>
                  <span className="block">:{field.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col w-1/3">
              <h3 className="my-2 font-bold">System Utilization</h3>
              {SystemDetails[0].utilization.map((field) => (
                <div className="flex my-2" key={field.name}>
                  <span className="block w-1/2 font-bold">{field.label}</span>
                  <span className="block">:{field.value}</span>
                </div>
              ))}
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
            <div className="flex flex-col w-1/3">
              {DeploymentDetails.map((field) => (
                <div className="flex my-2" key={field.name}>
                  <span className="block w-1/2 font-bold">{field.label}</span>
                  <span className="block">:{field.value}</span>
                </div>
              ))}
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
