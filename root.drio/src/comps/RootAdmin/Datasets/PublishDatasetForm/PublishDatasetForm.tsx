import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/DDXSlice";

import { HiOutlineDuplicate } from "react-icons/hi";

import { useState } from "react";
import { Radio } from "react-aria-components";
import RadioGroup from "@/comps/ui/Forms/RadioGroup";
import {
  useProvisionDDXMutation,
  useGenerateDDXKeyMutation,
} from "@/state/services/apiService";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),
  ou: z.string({
    required_error: "Please select an option",
  }),
  mfaURL: z.string().optional(),
  mfaKey: z.string().nonempty("Please Enter a value").optional(),
});

type FormData = z.infer<typeof schema>;

export default function AddDDXForm() {
  const dispatch = useAppDispatch();
  const [visibility, setVisibility] = useState("");
  const [key, keyResult] = useGenerateDDXKeyMutation();
  const [provision, provisionResult] = useProvisionDDXMutation();

  const ddxSstate = useAppSelector((state) => state.DDX);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await provision({
        ...data,
      }).unwrap();

      dispatch(setRows([...ddxSstate.rows, res]));
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }

    form.reset();
    dispatch(setCloseModal("addDDXForm"));
  };

  const generateKey = async () => {
    try {
      const res = await key({}).unwrap();
      form.setValue(
        "mfaKey",
        res.key.substring(0, 30).split("-").join("").toUpperCase()
      );
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }
  };

  const copyKey = () => {
    navigator.clipboard.writeText(
      form.getValues("mfaKey") ?? "wJalrXUtnFEMIK7MDENGbPxRfiCY"
    );
    showAlert("Rollover Key Successfully Copied!", "success");
  };

  return (
    <>
      <Layout>
        <Form form={form} onSubmit={onSubmit} className="">
          <div className="mx-auto bg-white p-4 rounded-lg max-w-[20vw]">
            <h2 className="text-gray-700 text-2xl font-bold text-center">
              Add DDX
            </h2>

            <div className="flex flex-wrap -m-2 rounded-lg my-4">
              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Name"}
                  {...form.register("name")}
                  placeholder={"Enter name"}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <SelectInput
                  registerName="ou"
                  label={"Organization Unit"}
                  placeholder={"Enter OU"}
                  options={[
                    { label: "Corp", value: "corp" },
                    { label: "Dealer.com", value: "dealer.com" },
                    { label: "KBB", value: "kbb" },
                  ]}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <div className="relative">
                  <RadioGroup value={visibility} onChange={setVisibility}>
                    <Radio value="addMFA">
                      <span>Add MFA</span>
                    </Radio>
                  </RadioGroup>
                </div>
              </div>

              {visibility === "addMFA" && (
                <div className="px-4 py-2 w-full">
                  <TextInput
                    label={"MFA URL"}
                    {...form.register("mfaURL")}
                    placeholder={"validate.cox.com"}
                    defaultValue={"validate.cox.com"}
                    className="md:text-sm 2xl:text-base"
                  />
                </div>
              )}

              <div className="px-4 pt-2 w-full">
                <Button
                  intent={`tertiary`}
                  className="w-full"
                  isLoading={provisionResult.isLoading}
                >
                  Provision
                </Button>
              </div>

              <div className="px-4 py-2 w-full relative">
                <span className="text-xs text-gray-500 font-medium">
                  Note:use this key when installing and bringing up the DDX
                </span>
                <TextInput
                  disabled
                  label={""}
                  {...form.register("mfaKey")}
                  className="md:text-sm 2xl:text-base"
                  placeholder={"wJalrXUtnFEMIK7MDENGbPxRfiCY"}
                />
                <HiOutlineDuplicate
                  className="w-5 h-5 absolute right-8 top-12 text-gray-500 z-50 cursor-pointer"
                  onClick={() => copyKey()}
                />
              </div>
            </div>

            <div className="py-2 flex justify-center w-full mt-4">
              <Button
                type="button"
                intent={`secondary`}
                className="w-full md:w-auto mr-2 md:mr-6"
                onClick={() => dispatch(setCloseModal("publishDatasetForm"))}
              >
                <span className="inline-flex justify-center w-full">
                  Cancel
                </span>
              </Button>

              <Button
                type="button"
                intent={`primary`}
                className="w-full md:w-auto"
                onClick={() => generateKey()}
                isLoading={keyResult.isLoading}
              >
                <span className="inline-flex justify-center w-full">
                  Generate New Key
                </span>
              </Button>
            </div>
          </div>
        </Form>
      </Layout>
    </>
  );
}
