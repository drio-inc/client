import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setRows } from "@/state/slices/datasetSlice";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

import { HiOutlineDownload, HiOutlinePaperClip } from "react-icons/hi";

import { useState } from "react";
import { Radio } from "react-aria-components";
import RadioGroup from "@/comps/ui/Forms/RadioGroup";

import { usePublishDatasetMutation } from "@/state/services/apiService";

import { IoRefresh } from "react-icons/io5";

const schema = z.object({
  dataSource: z.string({
    required_error: "Please select an option",
  }),

  topic: z.string({
    required_error: "Please select an option",
  }),

  baseURL: z
    .string()
    .nonempty("Please Enter a value")
    .url("Please enter a valid URL"),

  name: z.string().nonempty("Please Enter a value"),

  file: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function PublishDatasetForm() {
  const dispatch = useAppDispatch();
  const [visibility, setVisibility] = useState("");
  const [publish, result] = usePublishDatasetMutation();

  const datasetState = useAppSelector((state) => state.dataset);
  const dataSourceState = useAppSelector((state) => state.dataSource);

  const options = dataSourceState.rows.map((row) => {
    return {
      label: row.sourceName,
      value: row.sourceName.split(" ").join("").toLowerCase(),
    };
  });

  const form = useZodForm({
    schema: schema,
  });

  const onAddNew = (selectedOption?: string) => {
    if (selectedOption === "add_new") {
      dispatch(setCloseModal("publishDatasetForm"));
      dispatch(setOpenModal("addDataSourceForm"));
      return;
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (visibility === "") {
      showAlert("Please select a visibility", "error");
      return;
    }

    try {
      const res = await publish({
        ...data,
        visibility,
      }).unwrap();

      dispatch(setRows([...datasetState.rows, res]));
      showAlert("Dataset published successfully", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }

    form.reset();
    dispatch(setCloseModal("publishDatasetForm"));
  };

  return (
    <>
      <Layout>
        <Form form={form} onSubmit={onSubmit}>
          <div className="mx-auto bg-white p-4 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
            <h2 className="text-gray-700 text-2xl font-bold text-center">
              Publish Dataset
            </h2>

            <div className="flex flex-wrap -m-2 rounded-lg my-4">
              <div className="px-4 py-2 w-full">
                <SelectInput
                  placeholder={"Select"}
                  registerName="dataSource"
                  label={"Select Data Source"}
                  onChangeCustomAction={onAddNew}
                  className="md:text-sm 2xl:text-base"
                  options={[...options, { label: "Add New", value: "add_new" }]}
                />
              </div>

              <div className="px-4 py-2 w-full">
                <SelectInput
                  registerName="dataSource"
                  label={"Select Topic Dataset "}
                  placeholder={"All"}
                  options={[
                    { label: "All", value: "all" },
                    { label: "Purchase", value: "purchase" },
                    { label: "MySQL", value: "mysql" },
                  ]}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Base URL"}
                  placeholder={"Enter URL"}
                  defaultValue={`https://example.com`}
                  {...form.register("baseURL")}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Set Dataset Name"}
                  {...form.register("name")}
                  placeholder={"Enter display name"}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <h3 className="px-4">Set Visibility</h3>

              <div className="px-4 py-2 w-full">
                <div className="relative">
                  <RadioGroup value={visibility} onChange={setVisibility}>
                    <div className="flex flex-wrap gap-y-2 justify-between w-full">
                      <Radio value="private">
                        <span>Private</span>
                      </Radio>
                      <Radio value="contractual">
                        <span>Contractual</span>
                      </Radio>
                      <Radio value="public">
                        <span>Public</span>
                      </Radio>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Set Public View"}
                  {...form.register("file")}
                  className="md:text-sm 2xl:text-base"
                  placeholder={"Select A json or csv file with example data"}
                />
              </div>

              <div className="flex flex-wrap gap-y-2 w-full justify-between px-4 py-2">
                <button
                  type="button"
                  className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center rounded border-2 border-indigo-200 text-drio-red-dark"
                >
                  <HiOutlineDownload className="mr-1 font-bold rotate-180" />
                  <span className="text-sm font-medium">Upload</span>
                </button>

                <button
                  type="button"
                  className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center rounded border-2 border-indigo-200 text-drio-red-dark"
                >
                  <IoRefresh className="mr-1 font-bold" />
                  <span className="text-sm font-medium">Swagger</span>
                </button>

                <button
                  type="button"
                  className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center rounded border-2 border-indigo-200 text-drio-red-dark"
                >
                  <HiOutlinePaperClip className="mr-1 font-bold" />
                  <span className="text-sm font-medium">GraphQL</span>
                </button>
              </div>
            </div>

            <div className="px-2 py-2 flex gap-4 justify-center w-full mt-4">
              <Button
                type="button"
                intent={`secondary`}
                className="w-full"
                onClick={() => dispatch(setCloseModal("publishDatasetForm"))}
              >
                <span className="inline-flex justify-center w-full">
                  Cancel
                </span>
              </Button>

              <Button
                type="button"
                onClick={() => onSubmit(form.getValues())}
                intent={`primary`}
                className="w-full"
                isLoading={result.isLoading}
              >
                <span className="inline-flex justify-center w-full">
                  Publish
                </span>
              </Button>
            </div>
          </div>
        </Form>
      </Layout>
    </>
  );
}
