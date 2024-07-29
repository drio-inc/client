import React from "react";
import Modal from "@/comps/ui/Modal";
import { FiEdit2 } from "react-icons/fi";
import { setOpenModal } from "@/state/slices/uiSlice";
import AuthConfigForm from "./AuthConfigForm/AuthConfigForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { AuthenticationData } from "@/state/slices/authenticationSlice";

const Authentication = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.authentication);

  return (
    <div className="bg-white px-8 py-4 rounded shadow">
      <div className="flex justify-between border-b pb-4">
        <h2 className="text-gray-700 text-2xl font-bold">Details</h2>
        <button
          className="transition-colors duration-200 ease-in-out border-2 border-drio-red rounded-md text-drio-red px-2 font-medium flex items-center gap-x-1 hover:border-drio-red-dark hover:text-drio-red-dark"
          onClick={() => dispatch(setOpenModal("authConfigForm"))}
        >
          <FiEdit2 />
          <span>Edit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4">
        {data.authenticationType && (
          <div className="flex flex-wrap flex-col py-2">
            <span className="text-gray-700 capitalize">Type</span>
            <span className="text-gray-700 uppercase">{data.authenticationType}</span>
          </div>
        )}

        {data.ldap &&
          data.authenticationType === "ldap" &&
          Object.keys(data.ldap).map((key) => (
            <div key={key} className="flex flex-wrap flex-col py-2">
              <span className="text-gray-700 capitalize">{key.replaceAll("_", " ")}</span>
              <span className="text-gray-700">
                {data?.ldap && data?.ldap[key as keyof AuthenticationData["ldap"]]}
              </span>
            </div>
          ))}

        {data.oauth &&
          data.authenticationType === "oauth" &&
          Object.keys(data.oauth).map((key) => (
            <div key={key} className="flex flex-wrap flex-col py-2">
              <span className="text-gray-700 capitalize">{key.replaceAll("_", " ")}</span>
              <span className="text-gray-700">
                {data?.oauth && data?.oauth[key as keyof AuthenticationData["oauth"]]}
              </span>
            </div>
          ))}

        {data.google &&
          data.authenticationType === "google" &&
          Object.keys(data.google).map((key) => (
            <div key={key} className="flex flex-wrap flex-col py-2">
              <span className="text-gray-700 capitalize">{key.replaceAll("_", " ")}</span>
              <span className="text-gray-700">
                {data?.google && data?.google[key as keyof AuthenticationData["google"]]}
              </span>
            </div>
          ))}
      </div>

      <div className="hidden">
        <Modal identifier="authConfigForm">
          <AuthConfigForm />
        </Modal>
      </div>
    </div>
  );
};

export default Authentication;
