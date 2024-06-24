import { z } from "zod";
import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { useForm } from "react-hook-form";
import { Separator } from "@/comps/ui/Separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/comps/ui/RadioGroup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/comps/ui/Tabs";

import { v4 as uuiv4 } from "uuid";
import { useState } from "react";
import { setCloseModal } from "@/state/slices/uiSlice";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import { setRows } from "@/state/slices/alertPoliciesSlice";
import { Button as ButtonV2 } from "@/comps/ui/Button/ButtonV2";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/comps/ui/Forms/FormV2";

import { Input } from "@/comps/ui/Input";
import { Textarea } from "@/comps/ui/Textarea";

import { Popover, PopoverContent, PopoverTrigger } from "@/comps/ui/Popover";
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/comps/ui/Command";
import cn from "@/utils/cn";

const schema = z.object({
  rule_template: z.string({
    required_error: "Please select an option",
  }),

  rule_description: z.string().min(10, { message: "Description is too short" }),

  data_source_id: z.string({
    required_error: "Please select an option",
  }),

  dataset_id: z.string({
    required_error: "Please select an option",
  }),

  notification_channel: z.string({
    required_error: "Please select an option",
  }),

  notification_message: z.string().min(3, { message: "Message is too short" }),
});

type FormData = z.infer<typeof schema>;

const ruleTemplateOptions = [
  {
    label: "Rule Template 1",
    value: "rule_template_1",
  },
  {
    label: "Rule Template 2",
    value: "rule_template_2",
  },
  {
    label: "Rule Template 3",
    value: "rule_template_3",
  },
];

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

const channelOptions = [
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Slack",
    value: "slack",
  },
  {
    label: "SMS",
    value: "sms",
  },
];

export default function AddAlertPolicyForm() {
  const dispatch = useAppDispatch();
  const [openDatasetPopover, setOpenDatasetPopover] = useState(false);
  const alertPolicies = useAppSelector((state) => state.alertPolicies);
  const [openDataSourcePopover, setOpenDataSourcePopover] = useState(false);
  const [tabValue, setTabValue] = useState("rule" as "rule" | "stream" | "threshold");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);

    try {
      // API CALL

      dispatch(
        setRows([
          ...alertPolicies.rows,
          {
            ...data,
            id: uuiv4(),
            enabled: "no",
            times_used: 0,
            times_queried: 0,
            number_of_fields: 0,
            number_of_streams: 0,
          },
        ])
      );
      showAlert("Template added successfully", "success");
    } catch (err: any) {
      showAlert(err?.data?.message ?? "Something went wrong. Please try again.", "error");
    }

    form.reset();
    dispatch(setCloseModal("addAlertPolicyForm"));
  };

  return (
    <Layout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mx-auto bg-white p-8 rounded-lg min-w-[22vw]"
        >
          <h2 className="text-gray-700 text-2xl font-bold my-4 text-center">
            Add New Alert Policy
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
                <span>Rule</span>
              </TabsTrigger>

              <Separator className="w-[40px] mx-2" />

              <TabsTrigger
                value="stream"
                className="flex flex-col data-[state=active]:bg-white data-[state=active]:text-drio-red rounded-lg border-none p-0 data-[state=inactive]:bg-transparent"
              >
                <span className="border-2 px-5 py-4 rounded-lg">2</span>
                <span>Stream</span>
              </TabsTrigger>

              <Separator className="w-[40px] mx-2" />

              <TabsTrigger
                value="threshold"
                className="flex flex-col data-[state=active]:bg-white data-[state=active]:text-drio-red rounded-lg border-none p-0 data-[state=inactive]:bg-transparent"
              >
                <span className="border-2 px-5 py-4 rounded-lg">3</span>
                <span>Notification</span>
              </TabsTrigger>
            </TabsList>

            <Separator className="w-full mt-8" />

            <TabsContent value="rule">
              <FormField
                control={form.control}
                name="rule_template"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Rule Template</FormLabel>
                    <Popover open={openDataSourcePopover} onOpenChange={setOpenDataSourcePopover}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <ButtonV2
                            role="combobox"
                            variant="outline"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-gray-400"
                            )}
                          >
                            {field.value
                              ? ruleTemplateOptions.find(
                                  (template) => template.value === field.value
                                )?.label
                              : "Select data template"}
                            <HiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </ButtonV2>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-[320px] p-0 z-[1003] bg-white">
                        <Command>
                          <CommandInput placeholder="Search rule template..." />
                          <CommandList>
                            <CommandEmpty>No rule template found.</CommandEmpty>
                            <CommandGroup>
                              {ruleTemplateOptions.map((template) => (
                                <CommandItem
                                  key={template.value}
                                  value={template.label}
                                  className="flex justify-between"
                                  onSelect={() => {
                                    form.setValue("rule_template", template.value);
                                    setOpenDataSourcePopover(false);
                                  }}
                                >
                                  {template.label}
                                  <HiCheck
                                    className={cn(
                                      "mr-2 h-4 w-4 text-drio-red-dark",
                                      template.value === field.value ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="py-2 flex gap-x-4 justify-center w-full mt-4">
                <Button
                  type="button"
                  className="w-full"
                  intent={`secondary`}
                  onClick={() => dispatch(setCloseModal("addAlertPolicyForm"))}
                >
                  <span className="inline-flex justify-center w-full">Cancel</span>
                </Button>

                <Button
                  type="button"
                  className="w-full"
                  intent={`primary`}
                  onClick={async () => {
                    const validate = await form.trigger(["rule_template"]);
                    if (!validate) return;
                    setTabValue("stream");
                  }}
                >
                  <span className="inline-flex justify-center w-full">Next</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="stream">
              <div className="flex items-center justify-between gap-x-4">
                <span className="text-[20px] text-gray-700 font-medium">Stream Definition</span>
                <span className="text-drio-red border-2 border-drio-red rounded px-2 flex items-center gap-x-1">
                  <span className="">+</span>
                  <span className="font-medium text-sm"> Add New Stream</span>
                </span>
              </div>

              <Separator className="w-full mt-2" />

              <div className="py-2 w-full">
                <FormField
                  control={form.control}
                  name="data_source_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data Source</FormLabel>
                      <Popover open={openDataSourcePopover} onOpenChange={setOpenDataSourcePopover}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <ButtonV2
                              role="combobox"
                              variant="outline"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-gray-400"
                              )}
                            >
                              {field.value
                                ? dataSourceOptions.find((source) => source.value === field.value)
                                    ?.label
                                : "Select data source"}
                              <HiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </ButtonV2>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="w-[320px] p-0 z-[1003] bg-white">
                          <Command>
                            <CommandInput placeholder="Search data source..." />
                            <CommandList>
                              <CommandEmpty>No data source found.</CommandEmpty>
                              <CommandGroup>
                                {dataSourceOptions.map((source) => (
                                  <CommandItem
                                    key={source.value}
                                    value={source.label}
                                    className="flex justify-between"
                                    onSelect={() => {
                                      form.setValue("data_source_id", source.value);
                                      setOpenDataSourcePopover(false);
                                    }}
                                  >
                                    {source.label}
                                    <HiCheck
                                      className={cn(
                                        "mr-2 h-4 w-4 text-drio-red-dark",
                                        source.value === field.value ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2 w-full">
                <FormField
                  control={form.control}
                  name="dataset_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Dataset</FormLabel>
                      <Popover open={openDatasetPopover} onOpenChange={setOpenDatasetPopover}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <ButtonV2
                              role="combobox"
                              variant="outline"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-gray-400"
                              )}
                            >
                              {field.value
                                ? datasetOptions.find((source) => source.value === field.value)
                                    ?.label
                                : "Select dataset"}
                              <HiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </ButtonV2>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="w-[320px] p-0 z-[1003] bg-white">
                          <Command>
                            <CommandInput placeholder="Search dataset..." />
                            <CommandList>
                              <CommandEmpty>No dataset found.</CommandEmpty>
                              <CommandGroup>
                                {datasetOptions.map((source) => (
                                  <CommandItem
                                    className="flex justify-between"
                                    key={source.value}
                                    value={source.label}
                                    onSelect={() => {
                                      form.setValue("dataset_id", source.value);
                                      setOpenDatasetPopover(false);
                                    }}
                                  >
                                    {source.label}
                                    <HiCheck
                                      className={cn(
                                        "mr-2 h-4 w-4 text-drio-red-dark",
                                        source.value === field.value ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2 flex gap-x-4 justify-center w-full mt-4">
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
                  onClick={async () => {
                    const validate = await form.trigger(["dataset_id", "data_source_id"]);

                    if (!validate) return;
                    setTabValue("threshold");
                  }}
                >
                  <span className="inline-flex justify-center w-full">Next</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="threshold">
              <div className="flex items-center justify-between">
                <span className="text-[20px] text-gray-700 font-medium">
                  Set Threshold Condition
                </span>
              </div>

              <Separator className="w-full mt-2" />

              <div className="py-2 w-full">
                <FormField
                  control={form.control}
                  name="notification_channel"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Channel</FormLabel>
                      <Popover open={openDataSourcePopover} onOpenChange={setOpenDataSourcePopover}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <ButtonV2
                              role="combobox"
                              variant="outline"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-gray-400"
                              )}
                            >
                              {field.value
                                ? channelOptions.find((channel) => channel.value === field.value)
                                    ?.label
                                : "Select data source"}
                              <HiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </ButtonV2>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="w-[320px] p-0 z-[1003] bg-white">
                          <Command>
                            <CommandInput placeholder="Search channel..." />
                            <CommandList>
                              <CommandEmpty>No channel found.</CommandEmpty>
                              <CommandGroup>
                                {channelOptions.map((channel) => (
                                  <CommandItem
                                    key={channel.value}
                                    value={channel.label}
                                    className="flex justify-between"
                                    onSelect={() => {
                                      form.setValue("notification_channel", channel.value);
                                      setOpenDataSourcePopover(false);
                                    }}
                                  >
                                    {channel.label}
                                    <HiCheck
                                      className={cn(
                                        "mr-2 h-4 w-4 text-drio-red-dark",
                                        channel.value === field.value ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2 w-full">
                <FormField
                  control={form.control}
                  name="notification_message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="resize-none"
                          placeholder="Enter your message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2 flex gap-x-4 justify-center w-full mt-4">
                <Button
                  type="button"
                  className="w-full"
                  intent={`secondary`}
                  onClick={() => setTabValue("stream")}
                >
                  <span className="inline-flex justify-center w-full">Back</span>
                </Button>

                <Button type="submit" intent={`primary`} className="w-full">
                  <span className="inline-flex justify-center w-full">Submit</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </Layout>
  );
}
