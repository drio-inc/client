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

import { useEffect, useState } from "react";
import { DataSourceFormdata } from "@/api/resources/data-sources/types";
import { usePatchDataSourceMutation } from "@/api/resources/data-sources";
import { Switch } from "@/comps/ui/Switch";

const kindOptions = [
  { label: "Kafka", value: "kafka" },
  { label: "Amazon Kinesis", value: "amazon kinesis" },
  { label: "Azure Event Hub", value: "azure event hub" },
];

const fetchIntervalOptions = [
  { label: "30 secs", value: 0.5 },
  { label: "1 min", value: 1 },
  { label: "5 mins", value: 5 },
  { label: "10 mins", value: 10 },
  { label: "15 mins", value: 15 },
  { label: "20 mins", value: 20 },
  { label: "25 mins", value: 25 },
  { label: "30 mins", value: 30 },
];

const encodingOptions = [
  { label: "Avro", value: "avro" },
  { label: "JSON", value: "json" },
  { label: "Unknown", value: "unknown" },
  { label: "protobuf", value: "protobuf" },
];

const schema = z
  .object({
    name: z.string().nonempty("Please Enter a value"),

    cluster_id: z.string({
      required_error: "Please select an option",
    }),

    kind: z.string({
      required_error: "Please select an option",
    }),

    endpoints: z.string().nonempty("Please Enter a value"),

    metrics_port: z.string().optional(),
    fetch_interval: z.number().optional(),
    metrics_enabled: z.boolean().optional(),

    encoding: z.string().optional(),
    schemaEndpoints: z.string().url().optional(),
    catalogEndpoints: z.string().url().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.metrics_enabled) {
      if (data.fetch_interval === undefined) {
        ctx.addIssue({
          code: "custom",
          message: "Please select an option",
          path: ["fetch_interval"],
        });
      }

      if (data.metrics_port === undefined || data.metrics_port === "") {
        ctx.addIssue({
          code: "custom",
          message: "Please enter a value",
          path: ["metrics_port"],
        });
      }
    }
  });

type FormData = z.infer<typeof schema>;

export default function EditDatasourceForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [patch, patchResult] = usePatchDataSourceMutation();
  const [schemaBoxVisibility, setSchemaBoxVisibility] = useState(!!row.schema_registry);
  const [catalogBoxVisibility, setCatalogBoxVisibility] = useState(!!row.metadata_server);

  //   console.log(row);

  const ddxState = useAppSelector((state) => state.DDX);

  const form = useZodForm({
    schema: schema,
    defaultValues: {
      name: row.name,
      kind: row.kind,
      endpoints: row.endpoints,
      cluster_id: row.cluster_id,
      metrics_enabled: row.metrics_enabled,
      schemaEndpoints: row.schema_registry?.endpoints,
      catalogEndpoints: row.metadata_server?.endpoints,
      metrics_port: row.metrics_enabled ? row.metrics_port.toString() : "",
      fetch_interval: row.metrics_enabled ? row.fetch_interval / 60 : undefined,
    },
  });

  const ddxOptions =
    ddxState?.rows
      ?.filter((filteredRow) => filteredRow?.ou_id === row?.ou_id)
      ?.map((mappedRow) => ({
        label: `${mappedRow.name} (${mappedRow.ou})`,
        value: mappedRow.id,
      })) ?? [];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const cluster = ddxState?.rows?.find((row) => row?.id === data?.cluster_id) as DDXCluster;

    let patchData: Omit<DataSourceFormdata, "secure" | "insecure_skip_verify"> = {
      name: data.name,
      kind: data.kind,
      endpoints: data.endpoints,
      metrics_enabled: row.metrics_enabled,
      metrics_port: Number(data.metrics_port),
      fetch_interval: (data?.fetch_interval && data?.fetch_interval * 60) ?? 0,

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

    console.log(patchData);

    try {
      const res = await patch({
        ...patchData,
        id: row.id,
      }).unwrap();

      showAlert("Data source updated successfully.", "success");
    } catch (err: any) {
      showAlert(err?.data?.message ?? "Something went wrong. Please try again.", "error");
    }

    form.reset();
    dispatch(setCloseModal("editDataSourceForm"));
  };

  return (
    <>
      <Layout>
        <Form form={form} onSubmit={onSubmit}>
          <div className="mx-auto bg-white px-6 py-8 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
            <h2 className="text-gray-700 text-2xl font-bold text-center">Edit Data Source</h2>

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
                  registerName="kind"
                  options={kindOptions}
                  className="md:text-sm 2xl:text-base"
                  placeholder={row.type ?? "Enter type"}
                  defaultSelectedValue={kindOptions.find((option) => option.value === row.kind)}
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

              <div className="px-4 py-2 w-full flex flex-col gap-y-2">
                <span className="text-sm font-medium text-gray-700">
                  Metrics Enabled(Cannot Edit)
                </span>
                <Switch
                  aria-readonly
                  checked={row.metrics_enabled}
                  className="!mt-0 opacity-40 pointer-events-none"
                />
              </div>

              {form.watch("metrics_enabled") && (
                <>
                  <div className="px-4 py-2 w-full">
                    <TextInput
                      minLength={1}
                      maxLength={5}
                      pattern="[0-9]*"
                      label={"Metrics Port"}
                      {...form.register("metrics_port")}
                      className="md:text-sm 2xl:text-base"
                      placeholder={"Enter port number - e.g. 9093"}
                    />
                  </div>

                  <div className="px-4 py-2 w-full">
                    <SelectInput
                      label={"Fetch Interval"}
                      registerName="fetch_interval"
                      options={fetchIntervalOptions}
                      placeholder={"Select interval"}
                      className="md:text-sm 2xl:text-base"
                      defaultSelectedValue={fetchIntervalOptions.find(
                        (option) => option.value === row.fetch_interval / 60
                      )}
                    />
                  </div>
                </>
              )}

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
                    onCheckedChange={() => setSchemaBoxVisibility(!schemaBoxVisibility)}
                  >
                    <Checkbox.Indicator className="text-white">
                      <HiCheck />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="text-sm">Is there any Schema-Registry available?</span>
                </div>
              </div>

              <div className="px-4 py-2 w-full">
                <div className="relative flex items-center gap-x-2">
                  <Checkbox.Root
                    className="flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                    checked={catalogBoxVisibility}
                    onCheckedChange={() => setCatalogBoxVisibility(!catalogBoxVisibility)}
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

              <Button intent={`primary`} className="w-full" isLoading={patchResult.isLoading}>
                <span className="inline-flex justify-center">Update</span>
              </Button>
            </div>
          </div>
        </Form>
      </Layout>
    </>
  );
}
