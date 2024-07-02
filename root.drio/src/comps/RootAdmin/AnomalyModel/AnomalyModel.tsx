import { z } from "zod";
import { useRouter } from "next/router";
import { SelectInput, TextInput } from "@/comps/ui/Forms/Inputs";
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
import { useState } from "react";

const schema = z.object({
  min_cluster_size: z.array(z.number()).nonempty("Please Enter a value"),

  min_samples: z.string({
    required_error: "Please select a type",
  }),

  contract: z.string({
    required_error: "Please select a contract",
  }),

  persona: z.string({
    required_error: "Please select a persona",
  }),
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
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div className="py-4 px-8 border-b">
          <h2 className="text-gray-700 text-xl font-bold">HDBSCAN Parameters</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-wrap w-full mb-4"
          >
            <div className="flex flex-wrap justify-around">
              <div className="py-2 w-full md:w-[45%]">
                <FormField
                  control={form.control}
                  name={`min_cluster_size`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Min Cluster Size - {field.value}</FormLabel>
                        <FormControl>
                          <>
                            <Slider
                              step={1}
                              max={100}
                              defaultValue={field.value}
                              onValueChange={field.onChange}
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
                <SelectInput
                  label="For Contract"
                  registerName="contract"
                  placeholder="Select contract"
                  options={[
                    { label: "UPS", value: "ups" },
                    { label: "DHL", value: "dhl" },
                    { label: "Xtime", value: "xtime" },
                    { label: "Kintetsu", value: "kintetsu" },
                    { label: "kbb", value: "Kelly Blue Book" },
                    { label: "Wells Fargo", value: "wells_fargo" },
                    { label: "Market Analytics", value: "market_analytics" },
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-wrap ml-8 w-4/5">
              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <SelectInput
                  label="Type"
                  registerName="type"
                  placeholder="Select type"
                  options={[
                    { label: "Privacy", value: "privacy" },
                    { label: "Security", value: "security" },
                    { label: "Regulatory", value: "regulatory" },
                    { label: "Contractual", value: "contractual" },
                  ]}
                />
              </div>

              <div className="px-4 py-2 w-full md:w-1/2 xl:w-1/3">
                <SelectInput
                  label="Persona"
                  registerName="persona"
                  placeholder="Select persona"
                  options={[
                    { label: "Fraud", value: "fraud" },
                    { label: "Logistics", value: "logistics" },
                    { label: "Financial", value: "financial" },
                    { label: "Marketing", value: "marketing" },
                    { label: "Fin Compliance", value: "fin_compliance" },
                  ]}
                />
              </div>
            </div>

            <div className="flex mb-4 justify-end mr-4">
              <Button
                intent={"primary"}
                className="w-[128px]"
                type="button"
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
