import Button from "@ui/Button";
import * as Checkbox from "@radix-ui/react-checkbox";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import * as RadioGroup from "@radix-ui/react-radio-group";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import type { DataSourceFormdata } from "@/api/resources/data-sources/types";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setOpenModal, setCloseModal, setNotification } from "@/state/slices/uiSlice";
import { setRows, setDefaultSource } from "@/state/slices/dataSourceSlice";

import { HiCheck } from "react-icons/hi";

import { useState } from "react";
import { useCreateDataSourceMutation } from "@/api/resources/data-sources";
import { Switch } from "@/comps/ui/Switch";

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

export default function AddDataSourceForm() {
  const dispatch = useAppDispatch();
  const [secure, setSecure] = useState("true");
  const [skipVerify, setSkipVerify] = useState("true");
  const [create, result] = useCreateDataSourceMutation();
  const [schemaBoxVisibility, setSchemaBoxVisibility] = useState(false);
  const [catalogBoxVisibility, setCatalogBoxVisibility] = useState(false);

  const { rows: ddxRows } = useAppSelector((state) => state.DDX);
  const dataSourceState = useAppSelector((state) => state.dataSource);
  const { addNewDispatched } = useAppSelector((state) => state.dataset);

  const form = useZodForm({
    schema: schema,
    defaultValues: {
      metrics_enabled: false,
    },
  });

  const ddxOptions =
    ddxRows?.map((row) => ({
      label: `${row.name} (${row.ou})`,
      value: row.id,
    })) ?? [];

  const skipVerifyValue = () => (secure === "true" && skipVerify === "false") || secure !== "true";

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const cluster = ddxRows?.find((row) => row.id === data.cluster_id) as (typeof ddxRows)[0];

    let createData: DataSourceFormdata = {
      name: data.name,
      kind: data.kind,
      endpoints: data.endpoints,
      metrics_enabled: data.metrics_enabled,
      fetch_interval: (data?.fetch_interval && data?.fetch_interval * 60) ?? 0,
      metrics_port: isNaN(Number(data.metrics_port)) ? 0 : Number(data.metrics_port),

      cluster_name: cluster?.name,
      cluster_id: data.cluster_id,
      ou_id: cluster?.ou_id as string,
      insecure_skip_verify: skipVerifyValue(),
      secure: secure === "true" ? true : false,
      account_id: cluster?.account_id as string,
    };

    if (schemaBoxVisibility) {
      createData = {
        ...createData,
        schema_registry: {
          name: `${data.name}_schema_registry` ?? "",
          endpoints: data.schemaEndpoints ?? "",
        },
      };
    }

    if (catalogBoxVisibility) {
      createData = {
        ...createData,
        metadata_server: {
          name: `${data.name}_metadata_server` ?? "",
          endpoints: data.catalogEndpoints ?? "",
        },
      };
    }

    console.log(createData);

    try {
      const res = await create(createData).unwrap();
      if (addNewDispatched) dispatch(setDefaultSource(res.data_source));

      dispatch(
        setRows([
          ...dataSourceState.rows,
          {
            ...res.data_source,
            datasets: 25,
            documentation: "Swagger",
          },
        ])
      );

      if (res) {
        const message = `${data.kind} Data Source '${data.name}' on ${cluster?.ou} - ${cluster?.name} added successfully`;

        dispatch(setNotification(message));
        dispatch(setOpenModal("dataSourcePopup"));
      }

      showAlert("Data source added successfully", "success");
    } catch (err: any) {
      showAlert(err?.data?.message ?? "Something went wrong. Please try again.", "error");
    }

    form.reset();
    dispatch(setCloseModal("addDataSourceForm"));
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white py-8 px-6 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">Add New Data Source</h2>

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
                label={"Select DDX (DDX - OU)"}
                registerName="cluster_id"
                options={ddxOptions ?? []}
                placeholder={"Select DDX name"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <SelectInput
                label={"Kind"}
                registerName="kind"
                placeholder={"Enter kind"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "Kafka", value: "kafka" },
                  { label: "Amazon Kinesis", value: "amazon kinesis" },
                  { label: "Azure Event Hub", value: "azure event hub" },
                ]}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Broker Endpoint"}
                {...form.register("endpoints")}
                className="md:text-sm 2xl:text-base"
                placeholder={"Enter broker endpoint"}
                defaultValue={"mykafka.host.com:9093"}
              />
            </div>

            <div className="px-4 py-2 w-full flex flex-col gap-y-2">
              <span className="text-sm font-medium text-gray-700">Metrics Enabled</span>

              <Switch
                aria-readonly
                className="!mt-0"
                checked={form.watch("metrics_enabled")}
                onCheckedChange={() => {
                  form.setValue("metrics_enabled", !form.watch("metrics_enabled"));

                  if (form.watch("metrics_enabled") === false) {
                    form.setValue("metrics_port", "");
                    form.setValue("fetch_interval", 0);
                  }
                }}
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
                    placeholder={"Select interval"}
                    className="md:text-sm 2xl:text-base"
                    options={[
                      { label: "30 secs", value: 0.5 },
                      { label: "1 min", value: 1 },
                      { label: "5 mins", value: 5 },
                      { label: "10 mins", value: 10 },
                      { label: "15 mins", value: 15 },
                      { label: "20 mins", value: 20 },
                      { label: "25 mins", value: 25 },
                      { label: "30 mins", value: 30 },
                    ]}
                  />
                </div>
              </>
            )}

            <h3 className="px-4 text-gray-700 text-sm font-medium">Secure?</h3>

            <div className="px-4 py-2 w-full">
              <RadioGroup.Root
                value={secure}
                aria-label="Secure"
                onValueChange={setSecure}
                className="flex flex-wrap gap-y-2 gap-x-4 w-full"
              >
                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r1"
                    value={"true"}
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label htmlFor="r1" className="text-gray-500 text-sm font-medium">
                    True
                  </label>
                </div>

                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r2"
                    value={"false"}
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label htmlFor="r2" className="text-gray-500 text-sm font-medium">
                    False
                  </label>
                </div>
              </RadioGroup.Root>
            </div>

            {secure === "true" && (
              <>
                <h3 className="px-4 text-gray-700 text-sm font-medium mt-2">
                  Validate certificates?
                </h3>

                <div className="px-4 py-2 w-full">
                  <RadioGroup.Root
                    value={skipVerify}
                    onValueChange={setSkipVerify}
                    aria-label="Validate certificates?"
                    className="flex flex-wrap gap-y-2 gap-x-4 w-full"
                  >
                    <div className="flex items-center gap-x-2">
                      <RadioGroup.Item
                        id="r3"
                        value={"true"}
                        className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                      />
                      <label htmlFor="r3" className="text-gray-500 text-sm font-medium">
                        True
                      </label>
                    </div>

                    <div className="flex items-center gap-x-2">
                      <RadioGroup.Item
                        id="r4"
                        value={"false"}
                        className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                      />
                      <label htmlFor="r4" className="text-gray-500 text-sm font-medium">
                        False
                      </label>
                    </div>
                  </RadioGroup.Root>
                </div>
              </>
            )}

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
                <span className="text-sm">Is there any Schema-Registry available?</span>
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
                    defaultValue={"https://my-schema-registry:8081"}
                  />
                </div>
              </>
            )}

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
                <span className="text-sm">Is there a Catalog Manager?</span>
              </div>
            </div>

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
                    defaultValue={"https://my-catalogue-mgr.com"}
                  />
                </div>
              </>
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

            <Button intent={`primary`} className="w-full" isLoading={result.isLoading}>
              <span className="inline-flex justify-center">Add</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
