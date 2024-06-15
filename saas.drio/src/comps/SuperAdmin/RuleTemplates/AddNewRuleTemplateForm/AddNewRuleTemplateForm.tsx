import Button from "@ui/Button";
import { Separator } from "@/comps/ui/Separator";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/comps/ui/Tabs";
import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { set, z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";

import { useCreateLicenseMutation } from "@/api/resources/licenses";
import { setRows } from "@/state/slices/licensingSlice";
import { useState } from "react";

const schema = z.object({
  rule_name: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(50, { message: "Name is too long" }),

  rule_description: z.string().min(3, { message: "Description is too short" }),

  stream_name: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(50, { message: "Name is too long" }),
  stream_description: z.string().min(3, { message: "Description is too short" }),

  data_source_id: z.string({
    required_error: "Please select an option",
  }),

  dataset_id: z.string({
    required_error: "Please select an option",
  }),

  window_function: z.string().min(3, { message: "Window function is too short" }),

  composite_stream: z.string().min(3, { message: "Composite stream is too short" }),
  threshold_condition: z.string().min(3, { message: "Threshold condition is too short" }),
});

type FormData = z.infer<typeof schema>;

export default function AddNewLicenseForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [windowType, setWindowType] = useState("");
  const [create, result] = useCreateLicenseMutation();
  const licenseState = useAppSelector((state) => state.licensing);
  const [tabValue, setTabValue] = useState("rule" as "rule" | "stream" | "threshold");

  const form = useZodForm({
    schema: schema,
  });

  const dataSourceOptions = [
    {
      label: "Kafka",
      value: "kafka",
    },
    {
      label: "Amazon Kinesis",
      value: "amazon_kinesis",
    },
    {
      label: "Azure Event Hub",
      value: "azure_event_hub",
    },
  ];

  const datasetOptions = [
    {
      label: "Dataset 1",
      value: "dataset_1",
    },
    {
      label: "Dataset 2",
      value: "dataset_2",
    },
    {
      label: "Dataset 3",
      value: "dataset_3",
    },
  ];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await create({
        ...data,
      }).unwrap();

      if (res) {
        dispatch(setRows([...licenseState.rows, res]));
        showAlert("License created successfully", "success");
      }
    } catch (err: any) {
      err;

      showAlert(err?.data?.message ?? "Something went wrong. Please try again.", "error");
    }

    form.reset();
    dispatch(setCloseModal("addNewRuleTemplateForm"));
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit} className="min-w-[22vw]">
        <div className="w-full mx-auto bg-white p-8 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-bold my-4 text-center">
            Add New Rule Template
          </h2>

          <Tabs
            value={tabValue}
            className="w-full flex flex-col justify-center mt-8"
            onValueChange={(val) => setTabValue(val as "rule" | "stream" | "threshold")}
          >
            <TabsList className="flex justify-around w-full">
              <TabsTrigger
                value="rule"
                className="flex flex-col data-[state=active]:bg-white data-[state=active]:text-drio-red rounded-lg border-none p-0 data-[state=inactive]:bg-transparent"
              >
                <span className="border-2 px-5 py-4 rounded-lg">1</span>
                <span> Rule</span>
              </TabsTrigger>

              <Separator className="w-[40px] mx-2" />

              <TabsTrigger
                value="stream"
                className="flex flex-col data-[state=active]:bg-white data-[state=active]:text-drio-red rounded-lg border-none p-0 data-[state=inactive]:bg-transparent"
              >
                <span className="border-2 px-5 py-4 rounded-lg">2</span>
                <span> Stream</span>
              </TabsTrigger>

              <Separator className="w-[40px] mx-2" />

              <TabsTrigger
                value="threshold"
                className="flex flex-col data-[state=active]:bg-white data-[state=active]:text-drio-red rounded-lg border-none p-0 data-[state=inactive]:bg-transparent"
              >
                <span className="border-2 px-5 py-4 rounded-lg">3</span>
                <span> Threshold</span>
              </TabsTrigger>
            </TabsList>

            <Separator className="w-full mt-8" />

            <TabsContent value="rule">
              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Rule Name"}
                  placeholder={"Stream 1"}
                  {...form.register("rule_name")}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Description"}
                  className="md:text-sm 2xl:text-base"
                  {...form.register("rule_description")}
                  placeholder={
                    "x=(stream-1.avg_data_cpu_usage+stream-2.avg_data_cpu_usage)/2; if x>50 then alert; end;"
                  }
                />
              </div>

              <div className="py-2 px-4 flex gap-x-4 justify-center w-full mt-4">
                <Button
                  type="button"
                  intent={`secondary`}
                  className="w-full"
                  onClick={() => dispatch(setCloseModal("addNewRuleTemplateForm"))}
                >
                  <span className="inline-flex justify-center w-full">Cancel</span>
                </Button>

                <Button
                  type="button"
                  intent={`primary`}
                  className="w-full"
                  onClick={() => setTabValue("stream")}
                >
                  <span className="inline-flex justify-center w-full">Next</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="stream">
              <div className="flex items-center justify-between">
                <span className="text-[20px] text-gray-700 font-medium">Stream Definition</span>
                <span className="text-drio-red border-2 border-drio-red rounded px-2 flex items-center">
                  <span className="">+</span>
                  <span className="font-medium"> Add New Stream</span>
                </span>
              </div>

              <Separator className="w-full mt-2" />

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Stream Name"}
                  placeholder={"Stream 1"}
                  {...form.register("stream_name")}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Stream Description"}
                  className="md:text-sm 2xl:text-base"
                  {...form.register("stream_description")}
                  placeholder={
                    "x=(stream-1.avg_data_cpu_usage+stream-2.avg_data_cpu_usage)/2; if x>50 then alert; end;"
                  }
                />
              </div>

              <div className="px-4 py-2 w-full">
                <SelectInput
                  placeholder={"Select"}
                  options={dataSourceOptions}
                  label={"Select Data Source"}
                  registerName="data_source_id"
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <SelectInput
                  placeholder={"Select"}
                  label={"Select Dataset"}
                  options={datasetOptions}
                  registerName="dataset_id"
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <h3 className="px-4 text-gray-700 text-sm font-medium">Window Type</h3>

              <div className="px-4 py-2 w-full">
                <RadioGroup.Root
                  value={windowType}
                  aria-label="Window Type"
                  onValueChange={setWindowType}
                  className="flex flex-wrap gap-y-2 gap-x-4 w-full"
                >
                  <div className="flex items-center gap-x-2">
                    <RadioGroup.Item
                      id="r1"
                      value={"sliding"}
                      className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                    />
                    <label htmlFor="r1" className="text-gray-500 text-sm font-medium">
                      Sliding
                    </label>
                  </div>

                  <div className="flex items-center gap-x-2">
                    <RadioGroup.Item
                      id="r2"
                      value={"step"}
                      className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                    />
                    <label htmlFor="r2" className="text-gray-500 text-sm font-medium">
                      Step
                    </label>
                  </div>
                </RadioGroup.Root>
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Window Function"}
                  className="md:text-sm 2xl:text-base"
                  {...form.register("window_function")}
                  placeholder={
                    "WinF1 = STDDEV (attr1) + AVG(attr2), Winf2 = attr3 + attr7 - attr11,"
                  }
                />
              </div>

              <div className="py-2 px-4 flex gap-x-4 justify-center w-full mt-4">
                <Button
                  type="button"
                  intent={`secondary`}
                  className="w-full"
                  onClick={() => setTabValue("rule")}
                >
                  <span className="inline-flex justify-center w-full">Back</span>
                </Button>

                <Button
                  type="button"
                  intent={`primary`}
                  className="w-full"
                  onClick={() => setTabValue("threshold")}
                >
                  <span className="inline-flex justify-center w-full">Next</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="threshold">
              <div className="flex items-center justify-between px-4">
                <span className="text-[20px] text-gray-700 font-medium">
                  Set Threshold Condition
                </span>
              </div>

              <Separator className="w-full mt-2" />

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Composite Stream"}
                  className="md:text-sm 2xl:text-base"
                  {...form.register("composite_stream")}
                  placeholder={
                    "CompSF1 = Stream1.attr7 + Stream2.WinF2 , CompSF2 = Srtream3.attr2, CompSF3 = ABS ( MAX(CompSF1)  STDDEV(stream2.WinF1) )"
                  }
                />
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Threshold Condition"}
                  className="md:text-sm 2xl:text-base"
                  {...form.register("threshold_condition")}
                  placeholder={"AVG(CompSF1) > MAX(CompSF2) AND CompSF3 > THRESHOLD_VALUE"}
                />
              </div>

              <div className="py-2 px-4 flex gap-x-4 justify-center w-full mt-4">
                <Button
                  type="button"
                  className="w-full"
                  intent={`secondary`}
                  onClick={() => setTabValue("stream")}
                >
                  <span className="inline-flex justify-center w-full">Back</span>
                </Button>

                <Button type="button" intent={`primary`} className="w-full">
                  <span className="inline-flex justify-center w-full">Submit</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Form>
    </Layout>
  );
}
