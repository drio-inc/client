import { z } from "zod";
import cn from "@/utils/cn";
import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import { v4 as uuiv4 } from "uuid";
import Layout from "@/comps/Layout";
import { Separator } from "@/comps/ui/Separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/comps/ui/RadioGroup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/comps/ui/Tabs";

import { useState } from "react";
import { setCloseModal } from "@/state/slices/uiSlice";
import { HiCheck, HiChevronDown, HiX } from "react-icons/hi";
import { Button as ButtonV2 } from "@/comps/ui/Button/ButtonV2";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import { RuleTemplate, setRows } from "@/state/slices/ruleTemplateSlice";

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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/comps/ui/Accordion";

import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/comps/ui/Command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/comps/ui/Select";
import { Switch } from "@/comps/ui/Switch";

const schema = z
  .object({
    rule_name: z
      .string()
      .min(3, { message: "Name is too short" })
      .max(50, { message: "Name is too long" }),

    rule_description: z.string().min(10, { message: "Description is too short" }),

    streams: z.array(
      z.object({
        id: z.string(),

        stream_name: z.string().min(3, { message: "Stream name is too short" }),
        stream_description: z.string().min(10, { message: "Stream description is too short" }),

        data_source_id: z.string({
          required_error: "Please select an option",
        }),

        dataset_id: z.string({
          required_error: "Please select an option",
        }),

        window_type: z.enum(["sliding", "step"], {
          required_error: "You need to select a window type.",
        }),

        window_size: z.string().min(0, { message: "Window size is too short" }),

        max_samples_enabled: z.boolean(),

        max_samples: z.string().optional(),

        window_function: z.string().min(3, { message: "Window function is too short" }),
      })
    ),

    composite_stream: z.string().optional(),
    threshold_condition: z.string().min(3, { message: "Threshold condition is too short" }),
  })
  .superRefine((data, ctx) => {
    if (
      data.streams.length > 1 &&
      (data.composite_stream === undefined || data.composite_stream === "")
    ) {
      return ctx.addIssue({
        code: "custom",
        message: "Composite stream cannot be empty",
        path: ["composite_stream"],
      });
    }
  });

type FormData = z.infer<typeof schema>;

const dataSourceOptions = [
  {
    label: "Any",
    value: "any",
  },
  {
    label: "User to Specify",
    value: "user_specify",
  },
];

const datasetOptions = [
  {
    label: "Any",
    value: "any",
  },
  {
    label: "User to Specify",
    value: "user_specify",
  },
];

type UpdateRuleTemplateFormProps = {
  clone: boolean;
  row: RuleTemplate;
};

export default function UpdateRuleTemplateForm({ row, clone }: UpdateRuleTemplateFormProps) {
  const dispatch = useAppDispatch();
  const [openDatasetPopover, setOpenDatasetPopover] = useState(false);
  const ruleTemplates = useAppSelector((state) => state.ruleTemplate);
  const [defaultAccordionValue, setDefaultAccordionValue] = useState("0");
  const [openDataSourcePopover, setOpenDataSourcePopover] = useState(false);
  const [tabValue, setTabValue] = useState("rule" as "rule" | "stream" | "threshold");

  console.log(row);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      streams: row.streams,
      rule_name: row.rule_name,
      rule_description: row.rule_description,
      composite_stream: row.composite_stream,
      threshold_condition: row.threshold_condition,
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "streams",
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (clone) {
        dispatch(
          setRows([
            ...ruleTemplates.rows,
            {
              ...data,
              id: uuiv4(),
              enabled: "no",
              times_used: 0,
              times_queried: 0,
              number_of_fields: 0,
              number_of_streams: fields.length,
              composite_stream: data.composite_stream ?? "",
              streams: data.streams.map((stream) => ({
                ...stream,
                id: uuiv4(),
              })),
            },
          ])
        );

        showAlert("Template cloned successfully", "success");
        dispatch(setCloseModal("cloneRuleTemplateForm"));
      } else {
        console.log(data.streams);

        const updatedRuleTemplate = {
          ...row,
          ...data,
        };

        const updatedRuleTemplates = ruleTemplates.rows.map((rule) =>
          rule.id === row.id ? updatedRuleTemplate : rule
        );

        console.log(updatedRuleTemplates);

        dispatch(setRows(updatedRuleTemplates));
        showAlert("Template updated successfully", "success");
        dispatch(setCloseModal("updateRuleTemplateForm"));
      }
    } catch (err: any) {
      showAlert(err?.data?.message ?? "Something went wrong. Please try again.", "error");
    }

    form.reset();
  };

  return (
    <Layout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mx-auto bg-white py-8 px-4 rounded-lg min-w-[400px]"
        >
          <h2 className="text-gray-700 text-2xl font-bold my-4 text-center">
            {clone ? "Clone" : "Update"} Rule Template
          </h2>

          <span>
            <HiX
              className="h-8 w-8 text-drio-red cursor-pointer absolute top-4 right-4"
              onClick={() =>
                clone
                  ? dispatch(setCloseModal("cloneRuleTemplateForm"))
                  : dispatch(setCloseModal("updateRuleTemplateForm"))
              }
            />
          </span>

          <Tabs
            value={tabValue}
            className="w-full flex flex-col justify-center mt-8"
            onValueChange={(val) => setTabValue(val as "rule" | "stream" | "threshold")}
          >
            <TabsList className="flex justify-around w-full px-4">
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
                <span>Stream</span>
              </TabsTrigger>

              <Separator className="w-[40px] mx-2" />

              <TabsTrigger
                value="threshold"
                className="flex flex-col data-[state=active]:bg-white data-[state=active]:text-drio-red rounded-lg border-none p-0 data-[state=inactive]:bg-transparent"
              >
                <span className="border-2 px-5 py-4 rounded-lg">3</span>
                <span>Threshold</span>
              </TabsTrigger>
            </TabsList>

            <div className="px-4">
              <Separator className="w-full mt-8" />
            </div>

            <TabsContent value="rule" className="px-4">
              <div className="py-2 w-full">
                <FormField
                  name="rule_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rule Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Rule 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2 w-full">
                <FormField
                  control={form.control}
                  name="rule_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="resize-none"
                          placeholder="E.g. This rule will trigger if the numeric metric or function value of a stream goes above a threshold"
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
                  intent={`secondary`}
                  className="w-full"
                  onClick={() =>
                    clone
                      ? dispatch(setCloseModal("cloneRuleTemplateForm"))
                      : dispatch(setCloseModal("updateRuleTemplateForm"))
                  }
                >
                  <span className="inline-flex justify-center w-full">Cancel</span>
                </Button>

                <Button
                  type="button"
                  className="w-full"
                  intent={`primary`}
                  onClick={async () => {
                    const validate = await form.trigger(["rule_name", "rule_description"]);
                    if (!validate) return;
                    setTabValue("stream");
                  }}
                >
                  <span className="inline-flex justify-center w-full">Next</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="stream">
              <div className="flex items-center justify-between gap-x-4 px-4">
                <span className="text-[20px] text-gray-700 font-medium">Stream Definition</span>
                {clone === true && (
                  <button
                    type="button"
                    className="text-drio-red border-2 border-drio-red rounded px-2 flex items-center gap-x-1"
                    onClick={() => {
                      setDefaultAccordionValue(`${fields.length}`);

                      append({
                        id: uuiv4(),
                        stream_name: "",
                        window_size: "0",
                        dataset_id: "",
                        max_samples: "0",
                        data_source_id: "",
                        window_function: "",
                        stream_description: "",
                        window_type: "sliding",
                        max_samples_enabled: false,
                      });
                    }}
                  >
                    <span className="">+</span>
                    <span className="font-medium text-sm">Add New Stream</span>
                  </button>
                )}
              </div>

              <div className="px-4">
                <Separator className="w-full mt-2" />
              </div>

              <Accordion
                collapsible
                type="single"
                value={defaultAccordionValue}
                onValueChange={setDefaultAccordionValue}
              >
                {fields.map((item, index) => (
                  <AccordionItem key={item.id} value={`${index}`}>
                    <AccordionTrigger>Stream {index + 1}</AccordionTrigger>

                    <AccordionContent>
                      <div className="py-2 w-full">
                        <FormField
                          name={`streams.${index}.stream_name`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stream Name</FormLabel>
                              <FormControl>
                                <Input placeholder={`Stream ${index + 1}`} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="py-2 w-full">
                        <FormField
                          control={form.control}
                          name={`streams.${index}.stream_description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stream Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  className="resize-none"
                                  placeholder="E.g. This stream is assumed to be one that has the volume metric"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="py-2 w-full">
                        <FormField
                          control={form.control}
                          name={`streams.${index}.data_source_id`}
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className={!clone ? "opacity-60" : ""}>
                                Data Source
                              </FormLabel>
                              <Popover
                                open={openDataSourcePopover}
                                onOpenChange={setOpenDataSourcePopover}
                              >
                                <PopoverTrigger asChild disabled={!clone}>
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
                                              form.setValue(
                                                `streams.${index}.data_source_id`,
                                                source.value
                                              );

                                              setOpenDataSourcePopover(false);
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

                      <div className="py-2 w-full ">
                        <FormField
                          control={form.control}
                          name={`streams.${index}.dataset_id`}
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className={!clone ? "opacity-60" : ""}>Dataset</FormLabel>
                              <Popover
                                open={openDatasetPopover}
                                onOpenChange={setOpenDatasetPopover}
                              >
                                <PopoverTrigger asChild disabled={!clone}>
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
                                              form.setValue(
                                                `streams.${index}.dataset_id`,
                                                source.value
                                              );
                                              setOpenDatasetPopover(false);
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
                          name={`streams.${index}.window_type`}
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Window Type</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  defaultValue={field.value}
                                  onValueChange={field.onChange}
                                  className="flex flex-wrap gap-y-2 gap-x-4 w-full"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="sliding" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Sliding</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="step" />
                                    </FormControl>
                                    <FormLabel className="font-normal">Step</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="py-2 w-full">
                        <FormField
                          control={form.control}
                          name={`streams.${index}.window_size`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Window Size</FormLabel>

                              <div className="flex border rounded-md">
                                <FormControl className="flex-grow">
                                  <Input
                                    {...field}
                                    type="number"
                                    className="border-none"
                                    placeholder="Enter size"
                                  />
                                </FormControl>

                                <Select
                                  defaultValue="mins"
                                  onValueChange={() => console.log("value changed")}
                                >
                                  <SelectTrigger className="w-min border-none">
                                    <SelectValue placeholder="Select a time range" />
                                  </SelectTrigger>

                                  <SelectContent className="z-[1003]">
                                    <SelectItem value="mins">mins</SelectItem>
                                    <SelectItem value="hours">hours</SelectItem>
                                    <SelectItem value="days">days</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div>
                          <FormField
                            control={form.control}
                            name={`streams.${index}.max_samples_enabled`}
                            render={({ field }) => {
                              return (
                                <FormItem className="flex items-center gap-x-4">
                                  <FormControl>
                                    <Switch
                                      aria-readonly
                                      className="!mt-0"
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>

                                  <FormLabel className="text-sm text-gray-700 !mt-0">
                                    Max Samples
                                  </FormLabel>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>

                        {form.watch(`streams.${index}.max_samples_enabled`) && (
                          <div>
                            <FormField
                              name={`streams.${index}.max_samples`}
                              control={form.control}
                              render={({ field }) => (
                                <FormItem className="flex items-center gap-x-2">
                                  <FormControl className="w-[80px]">
                                    <Input placeholder="0" {...field} />
                                  </FormControl>

                                  <FormLabel className="!mt-0">Samples</FormLabel>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </div>

                      <div className="py-2 w-full">
                        <div className="py-2 w-full">
                          <FormField
                            control={form.control}
                            name={`streams.${index}.window_function`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Window Function</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    className="resize-none"
                                    placeholder="WinF1 = STDDEV (attr1) + AVG(attr2), Winf2 = attr3 + attr7 - attr11,"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
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

                    if (!validate) {
                      showAlert("Please fill all the stream fields", "error");
                      return;
                    }

                    setTabValue("threshold");
                  }}
                >
                  <span className="inline-flex justify-center w-full">Next</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="threshold" className="px-4">
              <div className="flex items-center justify-between">
                <span className="text-[20px] text-gray-700 font-medium">
                  Set Threshold Condition
                </span>
              </div>

              <Separator className="w-full mt-2" />

              {form.watch("streams").length > 1 && (
                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="composite_stream"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Composite Stream</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="resize-none"
                            placeholder="CompSF1 = Stream1.attr7 + Stream2.WinF2 , CompSF2 = Srtream3.attr2, CompSF3 = ABS ( MAX(CompSF1)  STDDEV(stream2.WinF1) )"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="py-2 w-full">
                <FormField
                  control={form.control}
                  name="threshold_condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threshold Condition</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="resize-none"
                          placeholder="AVG(CompSF1) > MAX(CompSF2) AND CompSF3 > THRESHOLD_VALUE"
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
