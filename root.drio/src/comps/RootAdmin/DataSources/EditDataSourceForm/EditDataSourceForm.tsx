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
import { setRows } from "@/state/slices/dataSourceSlice";

import { HiCheck } from "react-icons/hi";

import { useState } from "react";
import { useEditDataSourceMutation } from "@/api/resources/data-sources";

const options = [
  { label: "Kafka", value: "kafka" },
  { label: "AWS Kinesis", value: "aws_kinesis" },
];

const encodingOptions = [
  { label: "Unknown", value: "unknown" },
  { label: "Avro", value: "avro" },
  { label: "JSON", value: "json" },
  { label: "protobuf", value: "protobuf" },
];

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  ddx: z.string({
    required_error: "Please select an option",
  }),

  type: z.string({
    required_error: "Please select an option",
  }),

  endpoint: z.string().nonempty("Please Enter a value"),

  encoding: z.string({
    required_error: "Please select an option",
  }),

  schemaURL: z.string().url().optional(),
  catalogURL: z.string().url().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditDatasourceForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [update, updateResult] = useEditDataSourceMutation();
  const [schemaBoxVisibility, setSchemaBoxVisibility] = useState(
    !!(row.schemaRegistry !== "None")
  );
  const [catalogBoxVisibility, setCatalogBoxVisibility] = useState(
    !!(row.catalogManagement !== "None")
  );

  const ddxState = useAppSelector((state) => state.DDX);
  const { rows } = useAppSelector((state) => state.dataSource);

  const form = useZodForm({
    schema: schema,
  });

  const ddxOptions =
    ddxState?.rows?.map((row) => ({
      label: `${row.name} (${row.ou})`,
      value: row.id,
    })) ?? [];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const update = {
      ...row,
      ...data,
    };

    dispatch(setRows(rows.map((row) => (row.id === update.id ? update : row))));

    // try {
    //   const res = await update({
    //     ...data,
    //     id: row.id,
    //   }).unwrap();
    //   dispatch(setRows(rows.map((row) => (row.id === res.id ? res : row))));
    //   showAlert("Data source updated successfully.", "success");
    // } catch (err: any) {
    //   showAlert(
    //     err?.data?.message ?? "Something went wrong. Please try again.",
    //     "error"
    //   );
    // }

    form.reset();
    dispatch(setCloseModal("editDataSourceForm"));
    showAlert("Data source updated successfully.", "success");
  };

  return (
    <>
      <Layout>
        <Form form={form} onSubmit={onSubmit}>
          <div className="mx-auto bg-white px-6 py-8 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
            <h2 className="text-gray-700 text-2xl font-bold text-center">
              Edit Data Source
            </h2>

            <div className="flex flex-wrap -m-2 rounded-lg my-4">
              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Name"}
                  defaultValue={row.name}
                  {...form.register("name")}
                  placeholder={"Enter name"}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <SelectInput
                  registerName="ddx"
                  options={ddxOptions}
                  label={"Select DDX"}
                  placeholder={"Select DDX name"}
                  className="md:text-sm 2xl:text-base"
                  defaultSelectedValue={ddxOptions.find(
                    (option) => option.value === row.ddx
                  )}
                />
              </div>

              <div className="px-4 py-2 w-full">
                <SelectInput
                  label={"Type"}
                  options={options}
                  registerName="type"
                  defaultValue={row.type}
                  className="md:text-sm 2xl:text-base"
                  placeholder={row.type ?? "Enter type"}
                  defaultSelectedValue={options.find(
                    (option) => option.value === row.type
                  )}
                />
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Broker Endpoint"}
                  defaultValue={row.endpoint}
                  {...form.register("endpoint")}
                  placeholder={"Enter broker endpoint"}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <SelectInput
                  label={"Encoding"}
                  registerName="encoding"
                  options={encodingOptions}
                  placeholder={"Enter Encoding"}
                  className="md:text-sm 2xl:text-base"
                  defaultSelectedValue={encodingOptions[0]}
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
                    onCheckedChange={() =>
                      setCatalogBoxVisibility(!catalogBoxVisibility)
                    }
                  >
                    <Checkbox.Indicator className="text-white">
                      <HiCheck />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="text-sm">Is there a Catalog Manager?</span>
                </div>
              </div>

              {schemaBoxVisibility && (
                <div className="px-4 py-2 w-full">
                  <TextInput
                    placeholder={"Enter URL"}
                    defaultValue={row.schemaURL}
                    {...form.register("schemaURL")}
                    label={"Enter Schema-Registry URL"}
                    className="md:text-sm 2xl:text-base"
                  />
                </div>
              )}

              {catalogBoxVisibility && (
                <div className="px-4 py-2 w-full">
                  <TextInput
                    placeholder={"Enter URL"}
                    defaultValue={row.catalogURL}
                    {...form.register("catalogURL")}
                    label={"Enter Catalog Manager URL"}
                    className="md:text-sm 2xl:text-base"
                  />
                </div>
              )}
            </div>

            <div className="py-2 px-2 flex w-full mt-4 gap-4">
              <Button
                type="button"
                className="w-full"
                intent={`secondary`}
                onClick={() => dispatch(setCloseModal("editDataSourceForm"))}
              >
                <span className="inline-flex justify-center">Cancel</span>
              </Button>

              <Button
                intent={`primary`}
                className="w-full"
                isLoading={updateResult.isLoading}
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
