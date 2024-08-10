import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import { v4 as uuidv4 } from "uuid";
import Layout from "@/comps/Layout";
import { useRouter } from "next/router";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { HiOutlineDownload } from "react-icons/hi";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import { setRows, setAddNewDispatched } from "@/state/slices/datasetSlice";

import { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  data_source_id: z.string({
    required_error: "Please select an option",
  }),

  topic: z.string({
    required_error: "Please select an option",
  }),

  baseURL: z.string().nonempty("Please Enter a value").url("Please enter a valid URL"),
});

type FormData = z.infer<typeof schema>;

const topicOptions = [
  { label: "All", value: "all" },
  { label: "MySQL", value: "mysql" },
  { label: "Purchase", value: "purchase" },
];

export default function PublishDatasetForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [visibility, setVisibility] = useState("private");
  const datasetState = useAppSelector((state) => state.dataset);
  const dataSourceState = useAppSelector((state) => state.dataSource);
  const [selectedJSON, setSelectedJSON] = useState<Blob | File | null>(null);

  const dataSourceOptions = dataSourceState?.rows?.length
    ? dataSourceState.rows?.map((row) => {
        return {
          label: row.name,
          value: row.id,
        };
      })
    : [];

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
    const dataSource = dataSourceState?.rows?.find((row) => row.id === data.data_source_id);

    if (visibility === "") {
      showAlert("Please select a visibility", "error");
      return;
    }

    let datasetFormdata = {
      ...data,
      alerts: 7,
      visibility,
      id: uuidv4(),
      frequency: 10,
      status: "learning",
      ou: dataSource?.ou,
      ds: dataSource?.name,
      contractInPlace: "Yes",
      sixMonthsAccess: "Yes",
      cluster_id: dataSource?.cluster_id,
    };

    dispatch(setRows([...datasetState.rows, datasetFormdata]));

    dispatch(setCloseModal("publishDatasetForm"));
    showAlert("Dataset published successfully", "success");
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white p-4 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">Publish Dataset</h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <div className="px-4 py-2 w-full">
              <SelectInput
                menuPlacement="bottom"
                placeholder={"Select"}
                defaultSelectedValue={
                  {
                    label: dataSourceState?.defaultSource?.sourceName,
                    value: dataSourceState?.defaultSource?.id.split(" ").join("_").toLowerCase(),
                  } ?? null
                }
                label={"Select Data Source"}
                registerName="data_source_id"
                onChangeCustomAction={onAddNew}
                className="md:text-sm 2xl:text-base"
                options={[...dataSourceOptions, { label: "Add New", value: "add_new" }]}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <SelectInput
                registerName="topic"
                options={topicOptions}
                placeholder={"Select"}
                label={"Select Topic Dataset"}
                className="md:text-sm 2xl:text-base"
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
                  <label htmlFor="r1" className="text-gray-500 text-sm font-medium">
                    Private
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r2"
                    value="contractual"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label className="text-gray-500 text-sm font-medium" htmlFor="r2">
                    Contractual
                  </label>
                </div>

                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r2"
                    value="public"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label className="text-gray-500 text-sm font-medium" htmlFor="r2">
                    Public
                  </label>
                </div>
              </RadioGroup.Root>
            </div>

            <div className="px-4 py-2 w-full flex flex-col gap-y-2">
              <label className="inline-block text-gray-700 text-sm font-medium">
                Set Subscriber View
              </label>

              <label
                htmlFor="upload-json"
                className="bg-gray-200 cursor-pointer border-2 border-dashed border-blue-500 py-2 px-3 my-1 rounded-md shadow-sm text-gray-400"
              >
                {selectedJSON?.name ?? "Select a json file with example data"}
              </label>

              <input
                hidden
                type="file"
                id="upload-json"
                accept=".json,application/json"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSelectedJSON(event?.target?.files && event?.target?.files[0]);
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

            <Button intent={`primary`} className="w-full">
              <span className="inline-flex justify-center">Publish</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
