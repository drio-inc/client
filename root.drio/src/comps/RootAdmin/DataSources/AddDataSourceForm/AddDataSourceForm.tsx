import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import * as Checkbox from "@radix-ui/react-checkbox";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows, setDefaultSource } from "@/state/slices/dataSourceSlice";

import { HiCheck } from "react-icons/hi";

import { useState } from "react";
import { useAddDataSourceMutation } from "@/api/resources/data-sources";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  ddx: z.string({
    required_error: "Please select an option",
  }),

  type: z.string({
    required_error: "Please select an option",
  }),

  endpoint: z.string().nonempty("Please Enter a value"),

  schemaURL: z.string().url().optional(),
  catalogURL: z.string().url().optional(),
});

type FormData = z.infer<typeof schema>;

export default function AddDataSourceForm() {
  const dispatch = useAppDispatch();
  const [addDataSource, result] = useAddDataSourceMutation();
  const [catalogBoxVisibility, setCatalogBoxVisibility] = useState(false);
  const [schemaBoxVisibility, setSchemaBoxVisibility] = useState(false);

  const datasetState = useAppSelector((state) => state.dataset);
  const dataSourceState = useAppSelector((state) => state.dataSource);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await addDataSource({
        ...data,
      }).unwrap();

      if (datasetState.addNewDispatched) {
        dispatch(setDefaultSource(res));
      }

      dispatch(setRows([...dataSourceState.rows, res]));
      showAlert("Data Source Added Successfully", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }

    form.reset();
    dispatch(setCloseModal("addDataSourceForm"));
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white py-8 px-6 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">
            Add New Data Source
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
                label={"Select DDX"}
                registerName="ddx"
                placeholder={"Enter DDX name"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "DDX 1 (Corp)", value: "ddx1_corp" },
                  { label: "DDX 2 (Corp)", value: "ddx2_corp" },
                  { label: "DDX 3 (Corp)", value: "ddx3_corp" },
                ]}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <SelectInput
                label={"Type"}
                registerName="type"
                placeholder={"Enter type"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "Kafka", value: "kafka" },
                  { label: "AWS Kinesis", value: "aws_kinesis" },
                ]}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Broker Endpoint"}
                {...form.register("endpoint")}
                className="md:text-sm 2xl:text-base"
                placeholder={"Enter broker endpoint"}
                defaultValue={"mykafka.host.com:9093"}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <div className="relative flex items-center gap-x-2">
                <Checkbox.Root
                  className="flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                  checked={schemaBoxVisibility}
                  onCheckedChange={() => {
                    setSchemaBoxVisibility(!schemaBoxVisibility);
                  }}
                >
                  <Checkbox.Indicator className="text-white">
                    <HiCheck />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-sm">
                  Is there any Schema-Registry available?
                </span>
              </div>
            </div>

            <div className="px-4 py-2 w-full">
              <div className="relative flex items-center gap-x-2">
                <Checkbox.Root
                  className="flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                  checked={catalogBoxVisibility}
                  onCheckedChange={() => {
                    setCatalogBoxVisibility(!catalogBoxVisibility);
                  }}
                >
                  <Checkbox.Indicator className="text-white">
                    <HiCheck />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-sm">
                  Is there any Catalog Manager available?
                </span>
              </div>
            </div>

            {schemaBoxVisibility && (
              <div className="px-4 py-2 w-full">
                <TextInput
                  placeholder={"Enter URL"}
                  {...form.register("schemaURL")}
                  label={"Enter Schema-Registry URL"}
                  className="md:text-sm 2xl:text-base"
                  defaultValue={"https://my-schema-registry:8081"}
                />
              </div>
            )}

            {catalogBoxVisibility && (
              <div className="px-4 py-2 w-full">
                <TextInput
                  placeholder={"Enter URL"}
                  {...form.register("catalogURL")}
                  label={"Enter Catalog Manager URL"}
                  className="md:text-sm 2xl:text-base"
                  defaultValue={"https://my-catalogue-mgr.com"}
                />
              </div>
            )}
          </div>

          <div className="py-2 px-2 flex w-full mt-4 gap-4">
            <Button
              type="button"
              intent={`secondary`}
              className="w-full"
              onClick={() => dispatch(setCloseModal("addDataSourceForm"))}
            >
              <span className="inline-flex justify-center">Cancel</span>
            </Button>

            <Button
              intent={`primary`}
              className="w-full"
              isLoading={result.isLoading}
            >
              <span className="inline-flex justify-center">Add</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
