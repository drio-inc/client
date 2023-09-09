import { useState } from "react";
import Layout from "@/comps/Layout";
import { HiX } from "react-icons/hi";
import { useAppDispatch } from "@/hooks/useStoreTypes";

import KeyForm from "../KeyForm";
import { IoCheckbox } from "react-icons/io5";
import { setCloseModal } from "@/state/slices/uiSlice";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

import { useGenerateDDXTokenMutation } from "@/api/resources/ddx";
import showAlert from "@/comps/ui/Alert/Alert";
import { setClusterToken } from "@/state/slices/DDXSlice";
import { RiLoader4Fill } from "react-icons/ri";

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
  const [generateDDXToken, result] = useGenerateDDXTokenMutation();

  const generateToken = async () => {
    try {
      const res = await generateDDXToken({
        account_id: row.account_id,
        ou_id: row.ou_id,
        cluster_id: row.id,
      }).unwrap();

      if (res.ddx_cluster.token) {
        dispatch(setClusterToken(res.ddx_cluster.token));
        showAlert("Token Successfully Generated!", "success");
      }
    } catch (err: any) {
      console.log(err);
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  return (
    <Layout>
      <div className="min-w-[90vw] relative w-full mx-auto bg-white p-8 rounded-lg">
        <h2 className="text-gray-700 text-lg font-bold mb-4">
          {row.ou ?? "Corp"}, {row.location ?? "US"}
        </h2>

        <span
          onClick={() => {
            dispatch(setClusterToken(""));
            dispatch(setCloseModal("detailsWindow"));
          }}
          className="absolute top-0 right-1 p-6 cursor-pointer"
        >
          <HiX className="w-6 h-6" />
        </span>

        <hr className="mb-4" />

        <div className="flex justify-between">
          <h3 className="text-gray-700 font-semibold text-lg">
            System Details
          </h3>

          <h3 className="text-gray-700 font-semibold text-lg">
            Status:{" "}
            <span
              className={`font-extrabold ${
                row.status === "active" ? `text-green-700` : "text-gray-700"
              } capitalize`}
            >
              {row.status}
            </span>
          </h3>

          <span className="invisible px-8" />
        </div>

        <div className="flex justify-between gap-x-4 my-4 shadow-sm p-4 rounded-lg bg-gray-50 text-gray-500 divide-x-2 divide-[#42B9F4]">
          <div className="flex flex-col w-1/3 px-4">
            {SystemDetails[0].defaults.map((field) => (
              <div className="flex my-2 justify-between" key={field.name}>
                <span className="block w-1/2 text-gray-700">{field.label}</span>
                <span className="block bg-indigo-100 text-gray-700 font-semibold p-3 rounded-md">
                  {field.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col w-1/3 px-4">
            <h3 className="my-2 font-bold text-gray-700 text-lg">
              DDX Cluster Provisioning
            </h3>
            {SystemDetails[0].provisioning.map((field) => (
              <div className="flex my-2 justify-between" key={field.name}>
                <span className="block w-1/2 text-gray-700">{field.label}</span>
                <span className="block bg-indigo-100 text-gray-700 font-semibold p-3 rounded-md">
                  {field.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col w-1/3 px-4">
            <h3 className="my-2 font-bold text-gray-700 text-lg">
              System Utilization
            </h3>
            {SystemDetails[0].utilization.map((field) => (
              <div className="flex my-2 justify-between" key={field.name}>
                <span className="block w-1/2 text-gray-700">{field.label}</span>
                <span className="block bg-indigo-100 text-gray-700 font-semibold p-3 rounded-md">
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-gray-700 font-semibold text-lg">
            Deployment details
          </h2>
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => generateToken()}
              className="flex items-center gap-x-2 bg-indigo-100 hover:bg-indigo-200 px-12 py-3 rounded-md text-md font-medium"
            >
              Generate Token
              {result.isLoading && (
                <RiLoader4Fill className="animate-spin text-3xl text-indigo-500 font-bold" />
              )}
            </button>
            <KeyForm />
          </div>
        </div>

        <div className="flex my-4 shadow-sm border p-2 rounded-lg bg-gray-50 text-gray-500">
          <div className="flex w-full justify-between divide-x-2 divide-[#42B9F4]">
            {DeploymentDetails.map((field) => (
              <div
                className="flex flex-col my-2 flex-grow px-2"
                key={field.name}
              >
                <span className="block font-bold text-lg">{field.label}</span>
                <span className="block">{field.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
