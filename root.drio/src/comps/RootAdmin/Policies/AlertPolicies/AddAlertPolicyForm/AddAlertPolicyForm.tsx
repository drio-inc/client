import { z } from "zod";
import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { useFieldArray, useForm } from "react-hook-form";
import { Separator } from "@/comps/ui/Separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/comps/ui/Tabs";

import { v4 as uuiv4 } from "uuid";
import { useEffect, useState } from "react";
import { setCloseModal } from "@/state/slices/uiSlice";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import { setRows } from "@/state/slices/alertPoliciesSlice";
import { Button as ButtonV2 } from "@/comps/ui/Button/ButtonV2";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/comps/ui/Accordion";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/comps/ui/Forms/FormV2";

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

  streams: z.array(
    z.object({
      data_source_id: z.string({
        required_error: "Please select an option",
      }),

      dataset_id: z.string({
        required_error: "Please select an option",
      }),
    })
  ),

  channels: z.array(
    z.object({
      channel: z.string({
        required_error: "Please select an option",
      }),

      message: z.string({
        required_error: "Please enter a message",
      }),
    })
  ),
});

type FormData = z.infer<typeof schema>;

const ruleTemplateOptions = [
  {
    id: "rule_template_1",
    rule_name: "Rule Template 1",
    streams: [
      {
        stream_name: "Stream 1",
      },
    ],
  },
  {
    id: "rule_template_2",
    rule_name: "Rule Template 2",
    streams: [
      {
        stream_name: "Stream 1",
      },
      {
        stream_name: "Stream 2",
      },
    ],
  },
  {
    id: "rule_template_3",
    rule_name: "Rule Template 3",
    streams: [
      {
        stream_name: "Stream 1",
      },
      {
        stream_name: "Stream 2",
      },
      {
        stream_name: "Stream 3",
      },
    ],
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
  const alertPolicies = useAppSelector((state) => state.alertPolicies);
  const [defaultAccordionValue, setDefaultAccordionValue] = useState("0");
  const [openRuleTemplatePopover, setOpenRuleTemplatePopover] = useState(false);
  const [tabValue, setTabValue] = useState("rule" as "rule" | "stream" | "notification");
  const [openNotificationChannelPopover, setOpenNotificationChannelPopover] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      channels: [
        {
          channel: "",
          message: "",
        },
      ],
    },
  });

  const {
    fields: streamFields,
    append: appendStream,
    remove: removeStream,
  } = useFieldArray({
    name: "streams",
    control: form.control,
  });

  const {
    fields: channelFields,
    append: appendChannel,
    remove: removeChannel,
  } = useFieldArray({
    name: "channels",
    control: form.control,
  });

  const [openDatasetPopovers, setOpenDatasetPopovers] = useState<boolean[]>([]);
  const [openDataSourcePopovers, setOpenDataSourcePopovers] = useState<boolean[]>([]);

  const onSubmit = async (data: FormData) => {
    console.log(data);

    try {
      dispatch(
        setRows([
          ...alertPolicies.rows,
          {
            ...data,
            id: uuiv4(),
            threshold_value: "40%",
            message: data.channels[0].message,
            notification: data.channels[0].channel,
            data_source: data.streams[0].data_source_id,
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
          className="w-full mx-auto bg-white p-8 rounded-lg min-w-[400px]"
        >
          <h2 className="text-gray-700 text-2xl font-bold my-4 text-center">
            Add New Alert Policy
          </h2>

          <Tabs
            value={tabValue}
            className="w-full flex flex-col justify-center mt-8"
            onValueChange={(val) => setTabValue(val as "rule" | "stream" | "notification")}
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
                value="notification"
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
                    <Popover
                      open={openRuleTemplatePopover}
                      onOpenChange={setOpenRuleTemplatePopover}
                    >
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
                              ? ruleTemplateOptions.find((template) => template.id === field.value)
                                  ?.rule_name
                              : "Select rule template"}
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
                                  key={template.id}
                                  value={template.id}
                                  className="flex justify-between"
                                  onSelect={() => {
                                    form.setValue("rule_template", template.id);
                                    setOpenRuleTemplatePopover(false);
                                  }}
                                >
                                  {template.rule_name}
                                  <HiCheck
                                    className={cn(
                                      "mr-2 h-4 w-4 text-drio-red-dark",
                                      template.id === field.value ? "opacity-100" : "opacity-0"
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

                    const selectedRuleTemplate = ruleTemplateOptions.find(
                      (template) => template.id === form.watch("rule_template")
                    );

                    if (selectedRuleTemplate) {
                      removeStream();

                      selectedRuleTemplate.streams.forEach((stream) => {
                        appendStream({
                          data_source_id: "",
                          dataset_id: "",
                        });
                      });

                      setOpenDatasetPopovers(
                        new Array(selectedRuleTemplate.streams.length).fill(false)
                      );

                      setOpenDataSourcePopovers(
                        new Array(selectedRuleTemplate.streams.length).fill(false)
                      );
                    }

                    setTabValue("stream");
                  }}
                >
                  <span className="inline-flex justify-center w-full">Next</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="stream">
              <div className="flex items-center justify-between gap-x-4">
                <span className="text-[20px] text-gray-700 font-medium">
                  Specify Data Elements for Rule
                </span>
              </div>

              <Separator className="w-full my-2" />

              {form.getValues("rule_template") === undefined ? (
                <div className="text-red-500">Please select a rule template first</div>
              ) : (
                streamFields.map((item, index) => (
                  <div className="bg-gray-100 p-4 rounded-lg my-2" key={index}>
                    <span className="text-lg text-gray-700 font-bold">Stream {index + 1}</span>
                    <div className="py-2 w-full">
                      <FormField
                        control={form.control}
                        name={`streams.${index}.data_source_id`}
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between gap-x-8">
                            <FormLabel className="">Data Source</FormLabel>
                            <Popover
                              open={openDataSourcePopovers[index]}
                              onOpenChange={(val) =>
                                setOpenDataSourcePopovers(
                                  openDataSourcePopovers.map((_, i) => (i === index ? val : false))
                                )
                              }
                            >
                              <PopoverTrigger asChild className="bg-white">
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
                                      ? dataSourceOptions.find(
                                          (source) => source.value === field.value
                                        )?.label
                                      : "Select data source"}
                                    <HiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </ButtonV2>
                                </FormControl>
                              </PopoverTrigger>

                              <PopoverContent className="w-[220px] p-0 z-[1003] bg-white">
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
                                            form.setValue(
                                              `streams.${index}.data_source_id`,
                                              source.value
                                            );

                                            setOpenDataSourcePopovers(
                                              openDataSourcePopovers.map((_, i) => {
                                                console.log(i, index, i === index ? false : false);

                                                return i === index ? false : false;
                                              })
                                            );
                                          }}
                                        >
                                          {source.label}
                                          <HiCheck
                                            className={cn(
                                              "mr-2 h-4 w-4 text-drio-red-dark",
                                              source.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
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
                        name={`streams.${index}.dataset_id`}
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between gap-x-8">
                            <FormLabel className="">Dataset</FormLabel>
                            <Popover
                              open={openDatasetPopovers[index]}
                              onOpenChange={(val) =>
                                setOpenDatasetPopovers(
                                  openDatasetPopovers.map((_, i) => (i === index ? val : false))
                                )
                              }
                            >
                              <PopoverTrigger asChild className="bg-white">
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
                                      ? datasetOptions.find(
                                          (source) => source.value === field.value
                                        )?.label
                                      : "Select dataset"}
                                    <HiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </ButtonV2>
                                </FormControl>
                              </PopoverTrigger>

                              <PopoverContent className="w-[220px] p-0 z-[1003] bg-white">
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
                                          onSelect={(val) => {
                                            console.log(val, openDatasetPopovers);

                                            form.setValue(
                                              `streams.${index}.dataset_id`,
                                              source.value
                                            );

                                            setOpenDatasetPopovers(
                                              openDatasetPopovers.map((_, i) => {
                                                console.log(i, index, i === index ? false : false);

                                                return i === index ? false : false;
                                              })
                                            );
                                          }}
                                        >
                                          {source.label}
                                          <HiCheck
                                            className={cn(
                                              "mr-2 h-4 w-4 text-drio-red-dark",
                                              source.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
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
                  </div>
                ))
              )}

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
                    const validate = await form.trigger(["streams"]);

                    if (!validate) return;
                    setTabValue("notification");
                  }}
                >
                  <span className="inline-flex justify-center w-full">Next</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="notification">
              <div className="flex items-center justify-between gap-x-4 px-4">
                <span className="text-[20px] text-gray-700 font-medium">Notification</span>
                <button
                  type="button"
                  className="text-drio-red border-2 border-drio-red rounded px-2 flex items-center gap-x-1"
                  onClick={() => {
                    setDefaultAccordionValue(`${channelFields.length}`);

                    appendChannel({
                      channel: "",
                      message: "",
                    });
                  }}
                >
                  <span className="">+</span>
                  <span className="font-medium text-sm">Add New Channel</span>
                </button>
              </div>

              <Separator className="w-full mt-2" />

              <Accordion
                collapsible
                type="single"
                value={defaultAccordionValue}
                onValueChange={setDefaultAccordionValue}
              >
                {channelFields.map((item, index) => (
                  <AccordionItem key={item.id} value={`${index}`}>
                    <AccordionTrigger>Channel {index + 1}</AccordionTrigger>

                    <AccordionContent>
                      <div className="py-2 w-full">
                        <FormField
                          control={form.control}
                          name={`channels.${index}.channel`}
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Channel</FormLabel>
                              <Popover
                                open={openNotificationChannelPopover}
                                onOpenChange={setOpenNotificationChannelPopover}
                              >
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
                                        ? channelOptions.find(
                                            (channel) => channel.value === field.value
                                          )?.label
                                        : "Select channel"}
                                      <HiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </ButtonV2>
                                  </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className="w-[300px] p-0 z-[1003] bg-white">
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
                                              form.setValue(
                                                `channels.${index}.channel`,
                                                channel.value
                                              );

                                              setOpenNotificationChannelPopover(false);
                                            }}
                                          >
                                            {channel.label}
                                            <HiCheck
                                              className={cn(
                                                "mr-2 h-4 w-4 text-drio-red-dark",
                                                channel.value === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
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
                          name={`channels.${index}.message`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  className="resize-none"
                                  placeholder="Enter message here..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="py-2 flex gap-x-4 justify-center w-full mt-4 px-4">
                <Button
                  type="button"
                  intent={`secondary`}
                  className="w-full"
                  onClick={() => setTabValue("stream")}
                >
                  <span className="inline-flex justify-center w-full">Back</span>
                </Button>

                <Button intent={`primary`} className="w-full">
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
