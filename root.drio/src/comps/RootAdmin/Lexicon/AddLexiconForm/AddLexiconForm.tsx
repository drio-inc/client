import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import * as RadioGroup from "@radix-ui/react-radio-group";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { setCloseModal } from "@/state/slices/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { useState } from "react";
import { useCreateDataSourceMutation } from "@/api/resources/data-sources";
import { RiUploadCloud2Line } from "react-icons/ri";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  ou: z.string({
    required_error: "Please select an option",
  }),

  domain: z.string({
    required_error: "Please select an option",
  }),

  description: z.string().nonempty("Please Enter a value"),
});

type FormData = z.infer<typeof schema>;

export default function AddDataSourceForm() {
  const dispatch = useAppDispatch();
  const [create, result] = useCreateDataSourceMutation();
  const [associateLexicon, setAssociateLexicon] = useState("");

  const dataSourceState = useAppSelector((state) => state.dataSource);
  const { addNewDispatched } = useAppSelector((state) => state.dataset);
  const { recursiveRows: ouRows } = useAppSelector((state) => state.orgUnit);

  const form = useZodForm({
    schema: schema,
  });

  const ouOptions =
    ouRows?.map((row) => ({
      label: row.name,
      value: row.id,
    })) ?? [];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      showAlert("Data source added successfully", "success");
    } catch (err: any) {
      showAlert(err?.data?.message ?? "Something went wrong. Please try again.", "error");
    }

    form.reset();
    dispatch(setCloseModal("addNewDictionaryForm"));
  };

  console.log("ouOptions", ouOptions);

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white py-8 px-6 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">Add New Dictionary</h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Dictionary Name"}
                {...form.register("name")}
                placeholder={"Enter name"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <SelectInput
                registerName="ou"
                label={"For Org Unit"}
                options={ouOptions ?? []}
                placeholder={"Select Org Unit"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <SelectInput
                label={"Domain"}
                registerName="domain"
                placeholder={"Select Domain"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "Supply Chain", value: "supply_chain" },
                  { label: "Loans/Contracts", value: "loans/contracts" },
                  { label: "Auto mfg", value: "auto_mfg" },
                  { label: "Automobile", value: "automobile" },
                  { label: "Auto Service", value: "auto_service" },
                ]}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Description"}
                {...form.register("description")}
                placeholder={"Write a description"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="bg-[#F9FAFB] w-full shadow py-2 mx-4">
              <h3 className="px-4 text-gray-700 text-[18px] font-medium mb-2">Associate Lexicon</h3>

              <div className="px-4 py-2 w-full">
                <RadioGroup.Root
                  value={associateLexicon}
                  aria-label="Associate Lexicon"
                  onValueChange={setAssociateLexicon}
                  className="flex flex-wrap gap-4 w-full"
                >
                  <div className="flex items-center gap-x-2">
                    <RadioGroup.Item
                      id="r1"
                      value={"pre-existing"}
                      className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                    />
                    <label htmlFor="r1" className="text-gray-500 text-sm font-medium">
                      Pre-existing Lexicon
                    </label>
                  </div>

                  {associateLexicon === "pre-existing" && (
                    <div>
                      <div className="bg-white p-4 border shadow-sm mb-4 rounded cursor-pointer">
                        <RiUploadCloud2Line className="text-2xl text-gray-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-700 text-center">
                          <span className="font-bold">Click to upload</span> or drag and drop
                          Wordnet zip file for the domain
                        </p>
                      </div>
                      <Button intent={`primary`} type="button">
                        Upload
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center gap-x-2">
                    <RadioGroup.Item
                      id="r2"
                      value={"create-new"}
                      className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                    />
                    <label htmlFor="r2" className="text-gray-500 text-sm font-medium">
                      Create Dictionary
                    </label>
                  </div>

                  {associateLexicon === "create-new" && (
                    <div>
                      <div className="bg-white p-4 border shadow-sm mb-4 rounded cursor-pointer">
                        <RiUploadCloud2Line className="text-2xl text-gray-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-700 text-center">
                          <span className="font-bold">Click to upload</span> or Drag to Bulk Upload
                          files to be used to automatically create a Dictionaries
                        </p>
                      </div>
                      <Button intent={`primary`} type="button">
                        Upload
                      </Button>
                    </div>
                  )}
                </RadioGroup.Root>
              </div>
            </div>
          </div>

          <div className="py-2 px-2 flex w-full mt-4 gap-4">
            <Button
              type="button"
              className="w-full"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("addNewDictionaryForm"))}
            >
              <span className="inline-flex justify-center">Cancel</span>
            </Button>

            <Button intent={`primary`} className="w-full" isLoading={result.isLoading}>
              <span className="inline-flex justify-center">Add Lexicon</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
