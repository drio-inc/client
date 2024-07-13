import React from "react";
import Modal from "@/comps/ui/Modal";
import { FiEdit2 } from "react-icons/fi";
import AuthConfig from "./AuthConfigForm/AuthConfig";
import { setOpenModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { AuthenticationData } from "@/state/slices/authenticationSlice";

const Authentication = () => {
  const { data } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white px-8 py-4 rounded">
      <div className="flex justify-between border-b pb-4">
        <h2 className="text-gray-700 text-2xl font-bold">Authentication</h2>
        <button
          className="border-2 border-drio-red rounded-md text-drio-red px-2 font-medium flex items-center gap-x-1"
          onClick={() => dispatch(setOpenModal("authConfigForm"))}
        >
          <FiEdit2 />
          <span>Edit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4">
        {Object.keys(data).map((key) => (
          <div key={key} className="flex flex-wrap flex-col py-2">
            <span className="text-gray-700 capitalize">{key.replaceAll("_", " ")}</span>
            <span className="text-gray-700">{data[key as keyof AuthenticationData]}</span>
          </div>
        ))}
      </div>

      <div className="hidden">
        <Modal identifier="authConfigForm">
          <AuthConfig />
        </Modal>
      </div>
    </div>
  );
};

export default Authentication;
