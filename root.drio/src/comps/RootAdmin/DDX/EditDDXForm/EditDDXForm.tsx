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
import * as RadioGroup from "@radix-ui/react-radio-group";

import { useState } from "react";
import {
  useProvisionDDXMutation,
  useGenerateDDXKeyMutation,
} from "@/api/resources/ddx";

const schema = z.object({
  location: z.string().nonempty("Please Enter a value"),

  ou: z.string({
    required_error: "Please select an option",
  }),
  mfaURL: z.string().optional(),

  mfaKey: z.string().nonempty("Please Enter a value").optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditDDXForm({ row }: TableRow) {
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
      showAlert("DDX Provisioned Successfully!", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }

    form.reset();
    dispatch(setCloseModal("editDDXForm"));
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
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
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
    <Layout>
      <Form form={form} onSubmit={onSubmit} className="">
        <div className="mx-auto bg-white p-8 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">
            Edit DDX
          </h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Location"}
                placeholder={"Enter location"}
                {...form.register("location")}
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

            <div className="px-4 py-2 w-full relative">
              <span className="text-xs text-gray-500 font-medium">
                Note:use this key when installing and bringing up the DDX
              </span>

              <div className="flex items-center">
                <TextInput
                  disabled
                  label={""}
                  {...form.register("mfaKey")}
                  className="md:text-sm 2xl:text-base w-1/2 flex-grow"
                  placeholder={"wJalrXUtnFEMIK7MDENGbPxRfiCY"}
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
                  onClick={() => generateKey()}
                  isLoading={keyResult.isLoading}
                >
                  New Key
                </Button>
              </div>
            </div>
          </div>

          <div className="p-2 flex gap-x-2 justify-center w-full mt-4">
            <Button
              type="button"
              intent={`secondary`}
              className="w-full"
              onClick={() => dispatch(setCloseModal("editDDXForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button
              intent={`primary`}
              className="w-full"
              isLoading={provisionResult.isLoading}
            >
              <span className="inline-flex justify-center w-full">
                Update DDX
              </span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
