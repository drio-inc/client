import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setRows } from "@/state/slices/datasetSlice";
import { setCloseModal } from "@/state/slices/uiSlice";

import { HiOutlineDownload, HiOutlinePaperClip } from "react-icons/hi";

import { useState } from "react";
import { IoRefresh } from "react-icons/io5";
import { useUpdateDatasetMutation } from "@/state/services/apiService";

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

export default function EditDatasetForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [update, result] = useUpdateDatasetMutation();
  const [visibility, setVisibility] = useState("");

  const datasetState = useAppSelector((state) => state.dataset);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await update({
        ...data,
        visibility,
        id: row?.id,
      }).unwrap();

      dispatch(
        setRows(datasetState.rows.map((row) => (row.id === res.id ? res : row)))
      );

      showAlert("Dataset updated successfully", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }

    form.reset();
    dispatch(setCloseModal("editDatasetForm"));
  };

  return (
    <>
      <Layout>
        <Form form={form} onSubmit={onSubmit}>
          <div className="mx-auto bg-white p-4 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
            <h2 className="text-gray-700 text-2xl font-bold text-center">
              Update/Edit Dataset
            </h2>

            <div className="flex flex-wrap -m-2 rounded-lg my-4">
              <div className="px-4 py-2 w-full">
                <SelectInput
                  placeholder={"Select"}
                  registerName="dataSource"
                  label={"Select Data Source"}
                  options={[
                    { label: "My Kafka 1", value: "my_kafka_1" },
                    { label: "Cassandra-Q", value: "cassandra_q" },
                    { label: "Retail Kafka", value: "retail_kafka" },
                    { label: "MySQL-24", value: "mysql_24" },
                    { label: "Add New", value: "add_new" },
                  ]}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <SelectInput
                  registerName="dataSource"
                  label={"Select Topic Dataset"}
                  placeholder={"Select Topic"}
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
                  {...form.register("baseURL")}
                  defaultValue={`https://example.com`}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Set Dataset Name"}
                  {...form.register("name")}
                  defaultValue={row.dataset}
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

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Set Public View"}
                  {...form.register("file")}
                  className="md:text-sm 2xl:text-base"
                  placeholder={"Select A json or csv file with example data"}
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full justify-between px-4 py-2">
                <button
                  type="button"
                  className="flex-1 transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center rounded border-2 border-indigo-200 text-drio-red-dark"
                >
                  <HiOutlineDownload className="mr-1 font-bold rotate-180" />
                  <span className="text-sm font-medium">Upload</span>
                </button>

                <button
                  type="button"
                  className="flex-1 transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center rounded border-2 border-indigo-200 text-drio-red-dark"
                >
                  <IoRefresh className="mr-1 font-bold" />
                  <span className="text-sm font-medium">Swagger</span>
                </button>

                <button
                  type="button"
                  className="flex-1 transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center rounded border-2 border-indigo-200 text-drio-red-dark"
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
                onClick={() => dispatch(setCloseModal("editDatasetForm"))}
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
                  update
                </span>
              </Button>
            </div>
          </div>
        </Form>
      </Layout>
    </>
  );
}
