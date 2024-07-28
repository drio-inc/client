import { z } from "zod";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Button from "@/comps/ui/Button";
import showAlert from "@/comps/ui/Alert";
import { useForm } from "react-hook-form";
import { Slider } from "@/comps/ui/Slider";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/comps/ui/Forms/FormV2";

import { Input } from "@/comps/ui/Input";
import { Switch } from "@/comps/ui/Switch";
import { RadioGroup, RadioGroupItem } from "@/comps/ui/RadioGroup";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@comps/ui/Select";

const schema = z.object({
  min_samples: z.array(z.number()).nonempty("Please Select a value"),
  min_cluster_size: z.array(z.number()).nonempty("Please Select a value"),

  re_learning_enabled: z.boolean(),
  re_learning_preiod: z.number().min(1, "Please enter a valid number"),

  trigger: z.enum(["time_limit_based", "test_criteria_based"], {
    required_error: "You need to select a trigger type.",
  }),

  stream_learning_time_limit: z.number().min(1, "Please enter a valid number"),

  completion_criteria: z.string({
    required_error: "Please select a completion criteria",
  }),

  min_number_of_samples: z.number().min(1, "Please enter a valid number"),
});

type FormData = z.infer<typeof schema>;

const AnomalyModel = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    showAlert("Model updated successfully", "success");
  };

  return (
    <div className="w-full">
      <div className={"px-4 flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-wrap w-full mb-4"
          >
            <div className="py-4 px-8 border-b">
              <h2 className="text-gray-700 text-xl font-bold">HDBSCAN Parameters</h2>
            </div>

            <div className="flex flex-wrap justify-around">
              <div className="py-2 w-full md:w-[45%]">
                <FormField
                  control={form.control}
                  name={`min_cluster_size`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="text-sm text-gray-700">
                          Min Cluster Size - {field.value ?? 0}
                        </FormLabel>
                        <FormControl>
                          <>
                            <Slider
                              step={1}
                              max={100}
                              onValueChange={field.onChange}
                              defaultValue={field.value ?? [0]}
                            />

                            <div className="mt-1.5 flex flex-row justify-between">
                              {Array.from({ length: 100 + 1 }).map((_, i) => (
                                <span key={i} className={"text-sm font-light"}>
                                  {i === 0 || i === 100 ? i : ""}
                                </span>
                              ))}
                            </div>
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="py-2 w-full md:w-[45%]">
                <FormField
                  control={form.control}
                  name={`min_samples`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="text-sm text-gray-700">
                          Min Samples - {field.value ?? 0}
                        </FormLabel>
                        <FormControl>
                          <>
                            <Slider
                              step={1}
                              max={100}
                              onValueChange={field.onChange}
                              defaultValue={field.value ?? [0]}
                            />

                            <div className="mt-1.5 flex flex-row justify-between">
                              {Array.from({ length: 100 + 1 }).map((_, i) => (
                                <span key={i} className={"text-sm font-light"}>
                                  {i === 0 || i === 100 ? i : ""}
                                </span>
                              ))}
                            </div>
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-around items-center">
              <div className="py-2 w-full md:w-[45%]">
                <FormField
                  control={form.control}
                  name="re_learning_enabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-x-8">
                      <FormLabel className="text-sm text-gray-700">Re Learning Enabled</FormLabel>

                      <FormControl>
                        <Switch
                          aria-readonly
                          className="!mt-0"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2 w-full md:w-[45%]">
                <FormField
                  control={form.control}
                  name="re_learning_preiod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Re Learning Period</FormLabel>

                      <div className="flex border rounded-md">
                        <FormControl className="flex-grow">
                          <Input
                            {...field}
                            className="border-none"
                            placeholder="Re learning period"
                          />
                        </FormControl>

                        <Select
                          defaultValue="mins"
                          onValueChange={() => console.log("value changed")}
                        >
                          <SelectTrigger className="w-min border-none">
                            <SelectValue placeholder="Select a time range" />
                          </SelectTrigger>

                          <SelectContent side="left">
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
            </div>

            <div className="py-4 px-8 border-b">
              <h2 className="text-gray-700 text-xl font-bold">Learning Complete Trigger</h2>
            </div>

            <div className="flex flex-wrap justify-around items-center">
              <div className="py-2 w-full md:w-[45%]">
                <FormField
                  control={form.control}
                  name="trigger"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          defaultValue={field.value}
                          className="flex space-y-1"
                          onValueChange={field.onChange}
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="time_limit_based" />
                            </FormControl>
                            <FormLabel className="font-normal">Time Limit Based</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="test_criteria_based" />
                            </FormControl>
                            <FormLabel className="font-normal">Test Criteria Based</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2 w-full md:w-[45%]">
                <FormField
                  control={form.control}
                  name="stream_learning_time_limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Stream Learning Time Limit</FormLabel>

                      <div className="flex border rounded-md">
                        <FormControl className="flex-grow">
                          <Input
                            {...field}
                            className="border-none"
                            placeholder="Enter time limit"
                          />
                        </FormControl>

                        <Select
                          defaultValue="mins"
                          onValueChange={() => console.log("value changed")}
                        >
                          <SelectTrigger className="w-min border-none">
                            <SelectValue placeholder="Select a time range" />
                          </SelectTrigger>

                          <SelectContent side="left">
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
            </div>

            <div className="flex flex-wrap justify-around">
              <div className="py-2 w-full md:w-[45%]">
                <FormField
                  control={form.control}
                  name="completion_criteria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Completion Criteria</FormLabel>

                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a criteria" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="mins">0 change for 100 samples</SelectItem>
                          <SelectItem value="hours">0 change for 100 samples in 2 hours</SelectItem>
                          <SelectItem value="days">0 change for 100 samples in 2 days</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2 w-full md:w-[45%]">
                <FormField
                  control={form.control}
                  name="min_number_of_samples"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Minimum Number of Sample</FormLabel>

                      <FormControl className="flex-grow">
                        <Input {...field} placeholder="Enter number of samples" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex my-4 ml-auto mr-9 ">
              <Button
                type="button"
                intent={"primary"}
                className="w-[128px]"
                onClick={() => onSubmit(form.getValues())}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AnomalyModel;
