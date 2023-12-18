import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { HiOutlineDownload } from "react-icons/hi";
import { setRows } from "@/state/slices/datasetSlice";
import { setCloseModal } from "@/state/slices/uiSlice";

import { useState } from "react";
import { useCreateDatasetMutation } from "@/api/resources/datasets";

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

const topicOptions = [
  { label: "All", value: "all" },
  { label: "MySQL", value: "mysql" },
  { label: "Purchase", value: "purchase" },
];

export default function EditDatasetForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [update, result] = useCreateDatasetMutation();
  const { rows } = useAppSelector((state) => state.dataset);
  const [visibility, setVisibility] = useState(row.visibility);
  const [selectedJSON, setSelectedJSON] = useState<Blob | File | null>(null);
  const { rows: dataSourceRows } = useAppSelector((state) => state.dataSource);

  const dataSourceOptions = dataSourceRows.length
    ? dataSourceRows?.map((row) => {
        return {
          label: row.name,
          value: row.name.split(" ").join("_").toLowerCase(),
        };
      })
    : [];

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const uData = {
      ...row,
      ...data,
      visibility,
    };

    dispatch(setRows(rows.map((mRow) => (mRow.id === row.id ? uData : mRow))));
    showAlert("Dataset updated successfully", "success");

    form.reset();
    dispatch(setCloseModal("editDatasetForm"));
  };

  console.log(
    topicOptions.find((option) => option.value === row?.topic) ?? {
      label: "",
      value: "",
    }
  );

  return (
    <>
      <Layout>
        <Form form={form} onSubmit={onSubmit}>
          <div className="mx-auto bg-white p-4 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
            <h2 className="text-gray-700 text-2xl font-bold text-center">
              Update Dataset
            </h2>

            <div className="flex flex-wrap -m-2 rounded-lg my-4">
              <div className="px-4 py-2 w-full">
                <SelectInput
                  placeholder={"Select"}
                  registerName="dataSource"
                  label={"Select Data Source"}
                  className="md:text-sm 2xl:text-base"
                  defaultSelectedValue={
                    dataSourceOptions.find(
                      (option) => option.value === row?.dataSource
                    ) ?? { label: "", value: "" }
                  }
                  options={[
                    ...dataSourceOptions,
                    { label: "Add New", value: "add_new" },
                  ]}
                />
              </div>

              <div className="px-4 py-2 w-full">
                <SelectInput
                  registerName="topic"
                  options={topicOptions}
                  placeholder={"Select Topic"}
                  label={"Select Topic Dataset"}
                  className="md:text-sm 2xl:text-base"
                  defaultSelectedValue={
                    topicOptions.find(
                      (option) => option.value === row?.topic
                    ) ?? { label: "", value: "" }
                  }
                />
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Base URL"}
                  placeholder={"Enter URL"}
                  defaultValue={row.baseURL}
                  {...form.register("baseURL")}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  defaultValue={row.name}
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

                <span className="pointer-events-none border py-2 px-3 my-1 rounded-md shadow-sm border-gray-300 text-gray-400">
                  {selectedJSON?.name ??
                    row.json ??
                    "Select a json file with example data"}
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
                  onClick={() =>
                    document.getElementById("upload-json")?.click()
                  }
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
                intent={`secondary`}
                className="w-full"
                onClick={() => dispatch(setCloseModal("editDatasetForm"))}
              >
                <span className="inline-flex justify-center">Cancel</span>
              </Button>

              <Button
                type="button"
                onClick={() => onSubmit(form.getValues())}
                intent={`primary`}
                className="w-full"
                isLoading={result.isLoading}
              >
                <span className="inline-flex justify-center">Update</span>
              </Button>
            </div>
          </div>
        </Form>
      </Layout>
    </>
  );
}
