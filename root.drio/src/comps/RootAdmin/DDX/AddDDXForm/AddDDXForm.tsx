import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { RiKey2Line } from "react-icons/ri";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useEffect, useState } from "react";
import { setRows, setCurrentDDXCluster } from "@/state/slices/DDXSlice";
import { setCloseModal } from "@/state/slices/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { HiOutlineDuplicate } from "react-icons/hi";
import { useGetOrgUnitsQuery } from "@/api/resources/ous";
import * as RadioGroup from "@radix-ui/react-radio-group";

import {
  useProvisionDDXMutation,
  useCreateDDXClusterMutation,
} from "@/api/resources/ddx";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import axios from "axios";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  //location: z.string().nonempty("Please Enter a value"),

  ou: z.string({
    required_error: "Please select an option",
  }),

  twofaurl: z
    .string()
    .nonempty("Please Enter a value")
    .url("Please Enter a valid URL"),

  mfaKey: z.string().nonempty("Please Enter a value").optional(),
});

type FormData = z.infer<typeof schema>;

export default function AddDDXForm() {
  const dispatch = useAppDispatch();
  const [ipaddress, setipaddress] = useState("");
  const [visibility, setVisibility] = useState("");
  const [provision, provisionResult] = useProvisionDDXMutation();
  const [cluster, clusterResult] = useCreateDDXClusterMutation();

  const ddxSstate = useAppSelector((state) => state.DDX);
  const { user } = useAppSelector((state) => state.auth);
  const { data: orgUnitRows } = useGetOrgUnitsQuery(user?.account_id ?? "");

  const form = useZodForm({
    schema: schema,
  });

  useEffect(() => {
    async function fetchIpAddress() {
      const res = await axios.get(`${process.env.API_URL}/ping`);
      setipaddress(res.data.clientip);
    }
    fetchIpAddress();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await provision({
        ou_id: data.ou,
        name: data.name,
        state: "running",
        token: data.mfaKey,
        ipaddress: ipaddress,
        account_id: user?.account_id ?? "",
        cluster_id: ddxSstate.currentDDXCluster?.id ?? "",
      }).unwrap();

      dispatch(setRows([...ddxSstate.rows, res.ddx_instance]));
      showAlert("DDX Provisioned Successfully!", "success");

      form.reset();
      dispatch(setCloseModal("addDDXForm"));
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  const createCluster: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await cluster({
        ou_id: data.ou,
        name: data.name,
        twofaurl: data.twofaurl,
        account_id: user?.account_id ?? "",
      }).unwrap();

      if (res.ddx_cluster) {
        dispatch(setCurrentDDXCluster(res.ddx_cluster));
        form.setValue("mfaKey", res.ddx_cluster.token);
      }
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  const copyKey = () => {
    navigator.clipboard.writeText(form.getValues("mfaKey") ?? "");
    showAlert("Rollover Key Successfully Copied!", "success");
  };

  if (!orgUnitRows) return <StaticLoader />;

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit} className="">
        <div className="mx-auto bg-white p-8 rounded-lg xl:max-w-[24vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">
            Add DDX
          </h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Name"}
                placeholder={"Enter name"}
                {...form.register("name")}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            {/* <div className="px-4 py-2 w-full">
              <TextInput
                label={"Location"}
                placeholder={"Enter location"}
                {...form.register("location")}
                className="md:text-sm 2xl:text-base"
              />
            </div> */}

            <div className="px-4 py-2 w-full">
              <SelectInput
                registerName="ou"
                label={"Organization Unit"}
                placeholder={"Enter OU"}
                options={
                  orgUnitRows &&
                  orgUnitRows.map((row) => ({
                    label: row.name,
                    value: row.id,
                  }))
                }
                className="md:text-sm 2xl:text-base"
              />
            </div>

            {/* <div className="px-4 py-2 w-full">
              <RadioGroup.Root
                value={visibility}
                aria-label="Set Visibility"
                onValueChange={setVisibility}
                className="flex flex-wrap gap-y-2 justify-between w-full"
              >
                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r1"
                    value="addTFA"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    htmlFor="r1"
                    className="text-gray-500 text-sm font-medium"
                  >
                    Add MFA
                  </label>
                </div>
              </RadioGroup.Root>
            </div> */}

            {/* {visibility === "addTFA" && ( */}
            <div className="px-4 py-2 w-full">
              <TextInput
                label={"TFA URL"}
                {...form.register("twofaurl")}
                placeholder={"https://validate.cox.com"}
                defaultValue={"https://validate.cox.com"}
                className="md:text-sm 2xl:text-base"
              />
            </div>
            {/* )} */}

            <div className="px-4 py-2 w-full relative">
              <span className="text-xs text-gray-500 font-medium mb-2 block">
                Please copy this{" "}
                <span className="font-bold text-drio-red-dark">ONE TIME</span>{" "}
                token and use it when provisioning DDX
              </span>

              <div className="flex items-center">
                <TextInput
                  disabled
                  label={""}
                  {...form.register("mfaKey")}
                  className="md:text-sm 2xl:text-base w-1/2 flex-grow"
                  icon={
                    <HiOutlineDuplicate
                      className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 z-50 cursor-pointer block bg-gray-100"
                      onClick={() => copyKey()}
                    />
                  }
                />
                <Button
                  type="button"
                  className="ml-2"
                  intent={`primaryOutline`}
                  isLoading={clusterResult.isLoading}
                  icon={<RiKey2Line className="w-5 h-5" />}
                  onClick={() =>
                    createCluster(form.getValues() as unknown as FormData)
                  }
                >
                  Generate key
                </Button>
              </div>
            </div>
          </div>

          <div className="p-2 flex gap-x-2 justify-center w-full mt-4">
            <Button
              type="button"
              intent={`secondary`}
              className="w-full"
              onClick={() => dispatch(setCloseModal("addDDXForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button
              intent={`primary`}
              className="w-full"
              isLoading={provisionResult.isLoading}
              disabled={ddxSstate.currentDDXCluster === null}
            >
              <span className="inline-flex justify-center w-full">
                Provision DDX
              </span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
