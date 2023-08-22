import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setRows, setAddNewDispatched } from "@/state/slices/datasetSlice";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

import { HiOutlineDownload, HiOutlinePaperClip } from "react-icons/hi";

import { useState } from "react";
import { IoRefresh } from "react-icons/io5";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { usePublishDatasetMutation } from "@/api/resources/datasets";

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
});

type FormData = z.infer<typeof schema>;

export default function PublishDatasetForm() {
  const dispatch = useAppDispatch();
  const [publish, result] = usePublishDatasetMutation();
  const [visibility, setVisibility] = useState("private");
  const [selectedJSON, setSelectedJSON] = useState<Blob | File | null>(null);

  const datasetState = useAppSelector((state) => state.dataset);
  const dataSourceState = useAppSelector((state) => state.dataSource);

  const options = dataSourceState.rows.map((row) => {
    return {
      label: row.sourceName,
      value: row.sourceName.split(" ").join("_").toLowerCase(),
    };
  });

  const form = useZodForm({
    schema: schema,
  });

  const onAddNew = (selectedOption?: string) => {
    if (selectedOption === "add_new") {
      dispatch(setAddNewDispatched(true));

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

    if (!selectedJSON) {
      showAlert("Please select a JSON file", "error");
      return;
    }

    try {
      const res = await publish({
        ...data,
        visibility,
        json: selectedJSON,
      }).unwrap();

      dispatch(setRows([...datasetState.rows, res]));
      showAlert("Dataset published successfully", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }

    form.reset();
    dispatch(setCloseModal("publishDatasetForm"));
  };

  return (
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
                defaultSelectedValue={
                  {
                    label: dataSourceState.defaultSource?.sourceName,
                    value: dataSourceState.defaultSource?.sourceName
                      .split(" ")
                      .join("_")
                      .toLowerCase(),
                  } ?? null
                }
                registerName="dataSource"
                label={"Select Data Source"}
                onChangeCustomAction={onAddNew}
                className="md:text-sm 2xl:text-base"
                options={[...options, { label: "Add New", value: "add_new" }]}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <SelectInput
                registerName="topic"
                placeholder={"Select"}
                label={"Select Topic Dataset"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "MySQL", value: "mysql" },
                  { label: "Purchase", value: "purchase" },
                ]}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Base URL"}
                placeholder={"Enter URL"}
                {...form.register("baseURL")}
                defaultValue={`https://example.com`}
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
              <RadioGroup.Root
                value={visibility}
                aria-label="Set Visibility"
                onValueChange={setVisibility}
                className="flex flex-wrap gap-y-2 justify-between w-full"
              >
                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r1"
                    value="private"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    htmlFor="r1"
                    className="text-gray-500 text-sm font-medium"
                  >
                    Private
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r2"
                    value="contractual"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="r2"
                  >
                    Contractual
                  </label>
                </div>

                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r2"
                    value="public"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="r2"
                  >
                    Public
                  </label>
                </div>
              </RadioGroup.Root>
            </div>

            <div className="px-4 py-2 w-full flex flex-col gap-y-2">
              <label className="inline-block text-gray-700 text-sm font-medium">
                Set Subscriber View
              </label>

              <span className="border py-2 px-3 my-1 rounded-md shadow-sm border-gray-300 text-gray-400">
                {selectedJSON?.name ?? "Select a json file with example data"}
              </span>

              <input
                hidden
                type="file"
                id="upload-json"
                accept=".json,application/json"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSelectedJSON(
                    event?.target?.files && event?.target?.files[0]
                  );
                }}
              />
            </div>

            <div className="flex flex-wrap gap-y-2 w-full justify-between px-4 py-2">
              <button
                type="button"
                onClick={() => document.getElementById("upload-json")?.click()}
                className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center rounded border-2 border-indigo-200 text-drio-red-dark"
              >
                <HiOutlineDownload className="mr-1 font-bold rotate-180" />
                <span className="text-sm font-medium">Upload</span>
              </button>
            </div>
          </div>

          <div className="px-2 py-2 flex gap-4 justify-center w-full mt-4">
            <Button
              type="button"
              className="w-full"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("publishDatasetForm"))}
            >
              <span className="inline-flex justify-center">Cancel</span>
            </Button>

            <Button
              intent={`primary`}
              className="w-full"
              isLoading={result.isLoading}
            >
              <span className="inline-flex justify-center">Publish</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
