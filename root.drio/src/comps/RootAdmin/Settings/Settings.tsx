/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Modal from "@/comps/ui/Modal";
import Button from "@/comps/ui/Button";
import EmailServerForm from "./EmailServerForm";
import { HiOutlinePencil } from "react-icons/hi";
import { setOpenModal } from "@/state/slices/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

const Settings = () => {
  const dispatch = useAppDispatch();
  const { emailServer } = useAppSelector((state) => state.settings);
  return (
    <div className="flex flex-col gap-y-8">
      <div className={"flex flex-col w-full shadow rounded-lg bg-white px-8 py-6 text-gray-700"}>
        <div className="flex items-center justify-between w-full border-b pb-4">
          <span className="text-xl font-bold font-inter">NTP Servers</span>
          <Button icon={<HiOutlinePencil />} intent={"primaryOutline"} onClick={() => {}}>
            Edit
          </Button>
        </div>

        <div className="flex flex-col my-4 font-medium">
          <span className="text-xs">Server/URL</span>
          <span>time.google.server 2</span>
        </div>
      </div>

      <div className={"flex flex-col w-full shadow rounded-lg bg-white px-8 py-6 text-gray-700"}>
        <div className="flex items-center justify-between w-full border-b pb-4">
          <span className="text-xl font-bold font-inter">NTP Status</span>
        </div>

        <div className="flex flex-wrap items-center justify-between my-4">
          <div className="flex flex-col font-medium">
            <span className="text-xs">Node</span>
            <span>Node 00</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">NTP</span>
            <span>10.23.42.34</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">Status</span>
            <span>Synchronized</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">Node IP</span>
            <span>10.23.42.34</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">Offset</span>
            <span>0.911</span>
          </div>
        </div>
      </div>

      <div className={"flex flex-col w-full shadow rounded-lg bg-white px-8 py-6 text-gray-700"}>
        <div className="flex items-center justify-between w-full border-b pb-4">
          <span className="text-xl font-bold font-inter">Authentication</span>
          <Button icon={<HiOutlinePencil />} intent={"primaryOutline"} onClick={() => {}}>
            Edit
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between my-4">
          <div className="flex flex-col font-medium">
            <span className="text-xs">Type</span>
            <span>LDAP</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">Port</span>
            <span>8080</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">Retries</span>
            <span>3</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">CN</span>
            <span>ON</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">DN String</span>
            <span>ON</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">LDAP Version</span>
            <span>2.2</span>
          </div>
        </div>
      </div>

      <div className={"flex flex-col w-full shadow rounded-lg bg-white px-8 py-6 text-gray-700"}>
        <div className="flex items-center justify-between w-full border-b pb-4">
          <span className="text-xl font-bold font-inter">Email Server</span>
          <Button
            icon={<HiOutlinePencil />}
            intent={"primaryOutline"}
            onClick={() => dispatch(setOpenModal("emailServerForm"))}
          >
            Edit
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between my-4">
          <div className="flex flex-col font-medium">
            <span className="text-xs">Server Address</span>
            <span>{emailServer.server_address}</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">Server Username</span>
            <span>{emailServer.server_username}</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">From Email Address</span>
            <span>{emailServer.server_email_address}</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">Server Port</span>
            <span>{emailServer.server_port}</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">Password</span>
            <span>{emailServer.server_password.replace(/./g, "*")}</span>
          </div>

          <div className="flex flex-col font-medium">
            <span className="text-xs">From Name</span>
            <span>{emailServer.server_email_name}</span>
          </div>
        </div>
      </div>

      <div className={"flex flex-col w-full shadow rounded-lg bg-white px-8 py-6 text-gray-700"}>
        <span className="text-xl font-bold font-inter mb-4">Email Template</span>

        <div>
          <div className="flex items-center justify-between w-full border-b pb-4">
            <span className="text-base font-bold font-inter">User Welcome Email</span>
            <Button icon={<HiOutlinePencil />} intent={"primaryOutline"} onClick={() => {}}>
              Edit
            </Button>
          </div>

          <div className="flex flex-col gap-y-4 text-gray-700 font-inter mt-4">
            <span className="flex flex-col">
              <span className="font-bold">Subject</span>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
            </span>

            <span>
              <span className="font-bold">Body</span>

              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem
                Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text
                of the printing and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s,
              </p>
            </span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between w-full border-b pb-4">
            <span className="text-base font-bold font-inter">User Activation Email</span>
            <Button icon={<HiOutlinePencil />} intent={"primaryOutline"} onClick={() => {}}>
              Edit
            </Button>
          </div>

          <div className="flex flex-col gap-y-4 text-gray-700 font-inter mt-4">
            <span className="flex flex-col">
              <span className="font-bold">Subject</span>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
            </span>

            <span>
              <span className="font-bold">Body</span>

              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem
                Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text
                of the printing and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s,
              </p>
            </span>
          </div>
        </div>
      </div>

      <div className="hidden">
        <Modal identifier="emailServerForm">
          <EmailServerForm />
        </Modal>
      </div>
    </div>
  );
};

export default Settings;
