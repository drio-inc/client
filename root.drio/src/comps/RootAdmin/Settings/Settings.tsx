/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Modal from "@/comps/ui/Modal";
import Button from "@/comps/ui/Button";
import NTPServerForm from "./NTPServerForm";
import EmailServerForm from "./EmailServerForm";
import { HiOutlinePencil } from "react-icons/hi";
import { setOpenModal } from "@/state/slices/uiSlice";
import AuthConfigForm from "../Authentication/AuthConfigForm";
import { setTemplateType } from "@/state/slices/settingsSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import EmailTemplateForm from "./EmailTemplateForm";
import { AuthenticationData } from "@/state/slices/authenticationSlice";

const Settings = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.authentication);
  const { emailServer, ntpServer, emailTemplate } = useAppSelector((state) => state.settings);

  return (
    <div className="flex flex-col gap-y-8">
      <div className={"flex flex-col w-full shadow rounded-lg bg-white px-8 py-6 text-gray-700"}>
        <div className="flex items-center justify-between w-full border-b pb-4">
          <span className="text-xl font-bold font-inter">NTP Servers</span>
          <Button
            intent={"primaryOutline"}
            icon={<HiOutlinePencil />}
            onClick={() => dispatch(setOpenModal("ntpServerForm"))}
          >
            Edit
          </Button>
        </div>

        <div className="flex flex-col my-4 font-medium">
          <span className="text-xs">Server/URL</span>
          <span>{ntpServer.primary_server_address}</span>
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
          <Button
            intent={"primaryOutline"}
            icon={<HiOutlinePencil />}
            onClick={() => dispatch(setOpenModal("authConfigForm"))}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4">
          {data.authenticationType && (
            <div className="flex flex-wrap flex-col py-2">
              <span className="text-gray-700 capitalize text-xs">Type</span>
              <span className="text-gray-700 uppercase font-medium">{data.authenticationType}</span>
            </div>
          )}

          {data.ldap &&
            data.authenticationType === "ldap" &&
            Object.keys(data.ldap).map((key) => (
              <div key={key} className="flex flex-wrap flex-col py-2">
                <span className="text-gray-700 capitalize text-xs">{key.replaceAll("_", " ")}</span>
                <span className="text-gray-700 font-medium">
                  {data?.ldap && data?.ldap[key as keyof AuthenticationData["ldap"]]}
                </span>
              </div>
            ))}

          {data.oauth &&
            data.authenticationType === "oauth" &&
            Object.keys(data.oauth).map((key) => (
              <div key={key} className="flex flex-wrap flex-col py-2">
                <span className="text-gray-700 capitalize text-xs">{key.replaceAll("_", " ")}</span>
                <span className="text-gray-700 font-medium">
                  {data?.oauth && data?.oauth[key as keyof AuthenticationData["oauth"]]}
                </span>
              </div>
            ))}

          {data.google &&
            data.authenticationType === "google" &&
            Object.keys(data.google).map((key) => (
              <div key={key} className="flex flex-wrap flex-col py-2">
                <span className="text-gray-700 capitalize text-xs">{key.replaceAll("_", " ")}</span>
                <span className="text-gray-700 font-medium">
                  {data?.google && data?.google[key as keyof AuthenticationData["google"]]}
                </span>
              </div>
            ))}
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
            <Button
              icon={<HiOutlinePencil />}
              intent={"primaryOutline"}
              onClick={() => {
                dispatch(setTemplateType("welcome"));
                dispatch(setOpenModal("emailTemplateForm"));
              }}
            >
              Edit
            </Button>
          </div>

          <div className="flex flex-col gap-y-4 text-gray-700 font-inter mt-4">
            <span className="flex flex-col">
              <span className="font-bold">Subject</span>
              <p>{emailTemplate.welcomeEmailTemplate.subject}</p>
            </span>

            <span>
              <span className="font-bold">Body</span>

              <p>{emailTemplate.welcomeEmailTemplate.body}</p>
            </span>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between w-full border-b pb-4">
            <span className="text-base font-bold font-inter">User Activation Email</span>
            <Button
              icon={<HiOutlinePencil />}
              intent={"primaryOutline"}
              onClick={() => {
                dispatch(setTemplateType("activation"));
                dispatch(setOpenModal("emailTemplateForm"));
              }}
            >
              Edit
            </Button>
          </div>

          <div className="flex flex-col gap-y-4 text-gray-700 font-inter mt-4">
            <span className="flex flex-col">
              <span className="font-bold">Subject</span>
              <p>{emailTemplate.activationEmailTemplate.subject}</p>
            </span>

            <span>
              <span className="font-bold">Body</span>

              <p>{emailTemplate.activationEmailTemplate.body}</p>
            </span>
          </div>
        </div>
      </div>

      <div className="hidden">
        <Modal identifier="ntpServerForm">
          <NTPServerForm />
        </Modal>
      </div>

      <div className="hidden">
        <Modal identifier="emailServerForm">
          <EmailServerForm />
        </Modal>
      </div>

      <div className="hidden">
        <Modal identifier="authConfigForm">
          <AuthConfigForm />
        </Modal>
      </div>

      <div className="hidden">
        <Modal identifier="emailTemplateForm">
          <EmailTemplateForm />
        </Modal>
      </div>
    </div>
  );
};

export default Settings;
