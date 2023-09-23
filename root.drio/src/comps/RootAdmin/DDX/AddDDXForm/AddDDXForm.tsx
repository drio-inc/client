import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useState } from "react";
import { setRows, setClusterToken } from "@/state/slices/DDXSlice";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { useGetOrgUnitsQuery } from "@/api/resources/ous";
import * as RadioGroup from "@radix-ui/react-radio-group";

import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { useCreateDDXClusterMutation } from "@/api/resources/ddx";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  //location: z.string().nonempty("Please Enter a value"),

  ou: z.string({
    required_error: "Please select an option",
  }),

  // mfaurl: z
  //   .string()
  //   .nonempty("Please Enter a value")
  //   .url("Please Enter a valid URL"),
});

type FormData = z.infer<typeof schema>;

export default function AddDDXForm() {
  const dispatch = useAppDispatch();
  const [visibility, setVisibility] = useState("");
  const [createCluster, clusterResult] = useCreateDDXClusterMutation();

  const { user } = useAppSelector((state) => state.auth);
  const { data: orgUnitRows } = useGetOrgUnitsQuery(user?.account_id ?? "");

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await createCluster({
        ou_id: data.ou,
        name: data.name,
        account_id: user?.account_id ?? "",
        twofaurl: `http://validate.example.com`,
      }).unwrap();

      dispatch(setClusterToken(res.ddx_cluster.token));

      showAlert("DDX Provisioned Successfully!", "success");
      dispatch(setCloseModal("addDDXForm"));
      dispatch(setOpenModal("tokenPopup"));
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  if (!orgUnitRows) return <StaticLoader />;

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit} className="">
        <div className="mx-auto bg-white p-8 rounded-lg xl:max-w-[24vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">
            Add DDX Cluster
          </h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Cluster Name"}
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
                placeholder={"Enter OU"}
                label={"Organization Unit"}
                className="md:text-sm 2xl:text-base"
                options={
                  orgUnitRows &&
                  orgUnitRows.map((row) => ({
                    label: row.name,
                    value: row.id,
                  }))
                }
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
                    value="addMFA"
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

            {/* {visibility === "addMFA" && (
              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"MFA URL"}
                  {...form.register("mfaurl")}
                  className="md:text-sm 2xl:text-base"
                  placeholder={"https://validate.example.com"}
                  defaultValue={"https://validate.example.com"}
                />
              </div>
            )} */}
          </div>

          <div className="p-2 flex gap-x-2 justify-center w-full mt-4">
            <Button
              type="button"
              className="w-full"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("addDDXForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button
              intent={`primary`}
              className="w-full"
              isLoading={clusterResult.isLoading}
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
