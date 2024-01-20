import Button from "@ui/Button";
import { HiCheck } from "react-icons/hi";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setCloseModal } from "@/state/slices/uiSlice";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { useState } from "react";
import { DataSourceFormdata } from "@/api/resources/data-sources/types";
import { usePatchDataSourceMutation } from "@/api/resources/data-sources";

const options = [
  { label: "Kafka", value: "kafka" },
  { label: "Amazon Kinesis", value: "amazon kinesis" },
  { label: "Azure Event Hub", value: "azure event hub" },
];

const encodingOptions = [
  { label: "Avro", value: "avro" },
  { label: "JSON", value: "json" },
  { label: "Unknown", value: "unknown" },
  { label: "protobuf", value: "protobuf" },
];

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  cluster_id: z.string({
    required_error: "Please select an option",
  }),

  kind: z.string({
    required_error: "Please select an option",
  }),

  endpoints: z.string().nonempty("Please Enter a value"),

  encoding: z.string().optional(),

  // schemaRegistryName: z.string().optional(),
  schemaEndpoints: z.string().url().optional(),

  // catalogName: z.string().optional(),
  catalogEndpoints: z.string().url().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditDatasourceForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [patch, patchResult] = usePatchDataSourceMutation();
  const [schemaBoxVisibility, setSchemaBoxVisibility] = useState(
    !!row.schema_registry
  );
  const [catalogBoxVisibility, setCatalogBoxVisibility] = useState(
    !!row.metadata_server
  );

  const ddxState = useAppSelector((state) => state.DDX);

  const form = useZodForm({
    schema: schema,
  });

  const ddxOptions =
    ddxState?.rows
      ?.filter((filteredRow) => filteredRow?.ou_id === row?.ou_id)
      ?.map((mappedRow) => ({
        label: `${mappedRow.name} (${mappedRow.ou})`,
        value: mappedRow.id,
      })) ?? [];

  console.log(row, ddxState?.rows);
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const cluster = ddxState?.rows?.find(
      (row) => row?.id === data?.cluster_id
    ) as DDXCluster;

    let patchData: Omit<DataSourceFormdata, "secure" | "insecure_skip_verify"> =
      {
        name: data.name,
        kind: data.kind,
        endpoints: data.endpoints,

        cluster_name: cluster?.name,
        cluster_id: data.cluster_id,
        ou_id: cluster?.ou_id as string,
        account_id: cluster?.account_id as string,
      };

    if (schemaBoxVisibility) {
      patchData = {
        ...patchData,
        schema_registry: {
          name: `${data.name}_schema_registry` ?? "",
          endpoints: data.schemaEndpoints ?? "",
        },
      };
    }

    if (catalogBoxVisibility) {
      patchData = {
        ...patchData,
        metadata_server: {
          name: `${data.name}_metadata_server` ?? "",
          endpoints: data.catalogEndpoints ?? "",
        },
      };
    }

    console.log(JSON.stringify(patchData), patchData);

    try {
      const res = await patch({
        ...patchData,
        id: row.id,
      }).unwrap();

      showAlert("Data source updated successfully.", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }

    form.reset();
    dispatch(setCloseModal("editDataSourceForm"));
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
                  options={ddxOptions}
                  label={"Select DDX (DDX - OU)"}
                  registerName="cluster_id"
                  placeholder={"Select DDX name"}
                  className="md:text-sm 2xl:text-base"
                  defaultSelectedValue={ddxOptions.find(
                    (option) => option.value === row.cluster_id
                  )}
                />
              </div>

              <div className="px-4 py-2 w-full">
                <SelectInput
                  label={"Kind"}
                  options={options}
                  registerName="kind"
                  className="md:text-sm 2xl:text-base"
                  placeholder={row.type ?? "Enter type"}
                  defaultSelectedValue={options.find(
                    (option) => option.value === row.kind
                  )}
                />
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Broker Endpoint"}
                  defaultValue={row.endpoints}
                  {...form.register("endpoints")}
                  className="md:text-sm 2xl:text-base"
                  placeholder={"Enter broker endpoint"}
                />
              </div>

              {/* <div className="px-4 py-2 w-full">
                <SelectInput
                  label={"Encoding"}
                  registerName="encoding"
                  options={encodingOptions}
                  placeholder={"Enter Encoding"}
                  className="md:text-sm 2xl:text-base"
                  defaultSelectedValue={encodingOptions[0]}
                />
              </div> */}

              <div className="px-4 py-2 w-full">
                <div className="relative flex items-center gap-x-2">
                  <Checkbox.Root
                    className="flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                    checked={schemaBoxVisibility}
                    onCheckedChange={() =>
                      setSchemaBoxVisibility(!schemaBoxVisibility)
                    }
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
                <>
                  {/* <div className="px-4 py-2 w-full">
                    <TextInput
                      placeholder={"Enter name"}
                      label={"Enter Schema-Registry Name"}
                      className="md:text-sm 2xl:text-base"
                      {...form.register("schemaRegistryName")}
                    />
                  </div> */}

                  <div className="px-4 py-2 w-full">
                    <TextInput
                      placeholder={"Enter endpoints"}
                      className="md:text-sm 2xl:text-base"
                      {...form.register("schemaEndpoints")}
                      label={"Enter Schema-Registry Endpoints"}
                      defaultValue={row.schema_registry?.endpoints ?? ""}
                    />
                  </div>
                </>
              )}

              {catalogBoxVisibility && (
                <>
                  {/* <div className="px-4 py-2 w-full">
                    <TextInput
                      placeholder={"Enter name"}
                      {...form.register("catalogName")}
                      className="md:text-sm 2xl:text-base"
                      label={"Enter Catalog Manager Name"}
                    />
                  </div> */}

                  <div className="px-4 py-2 w-full">
                    <TextInput
                      placeholder={"Enter endpoints"}
                      className="md:text-sm 2xl:text-base"
                      {...form.register("catalogEndpoints")}
                      label={"Enter Catalog Manager Endpoints"}
                      defaultValue={row.metadata_server?.endpoints ?? ""}
                    />
                  </div>
                </>
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
                isLoading={patchResult.isLoading}
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
