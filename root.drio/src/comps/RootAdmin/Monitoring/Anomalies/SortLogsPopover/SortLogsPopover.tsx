import { Country } from "country-state-city";
import * as Popover from "@radix-ui/react-popover";
import { HiCheck, HiOutlineFilter, HiX } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { z } from "zod";
import Layout from "@/comps/Layout";
import Button from "@/comps/ui/Button";
import { SubmitHandler } from "react-hook-form";
import * as Switch from "@radix-ui/react-switch";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useZodForm, Form } from "@/comps/ui/Forms/Form";
import { SelectInput, TextInput } from "@/comps/ui/Forms/Inputs";
import { useState } from "react";

const schema = z.object({
  dataset: z.string().nonempty("Please enter a value"),
  subscriberOU: z.string().nonempty("Please enter a value"),

  country: z.string({
    required_error: "Please select a country",
  }),
});

type FormData = z.infer<typeof schema>;

const SortLogsPopover = () => {
  const [checkedName, setCheckedName] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState(false);
  const [checkedCountry, setCheckedCountry] = useState(false);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {};

  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded-md border-2 border-indigo-200 text-drio-red-dark">
          <HiOutlineFilter className="mr-1 font-bold" />
          <span className="text-sm font-medium">Sort by Field</span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          sideOffset={5}
          align="end"
          className="bg-white rounded-lg shadow-lg text-sm text-gray-700"
        >
          <Layout>
            <Form form={form} onSubmit={onSubmit}>
              <div className="mx-auto bg-white p-4 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
                <div className="flex flex-wrap -m-2 rounded-lg my-4">
                  <div className="w-full flex justify-end px-2">
                    <Switch.Root
                      className="w-[42px] h-[25px] bg-gray-200 rounded-full shadow-lg data-[state=checked]:bg-drio-red outline-none cursor-pointer"
                      checked={checkedName}
                      onCheckedChange={() => setCheckedName(!checkedName)}
                    >
                      <Switch.Thumb className="flex items-center justify-center w-[21px] h-[21px] bg-white rounded-full shadow-sm transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]">
                        {checkedName ? (
                          <HiCheck className="text-gray-400" />
                        ) : (
                          <HiX className="text-gray-400" />
                        )}
                      </Switch.Thumb>
                    </Switch.Root>
                  </div>
                  <div className="p-2 w-1/2">
                    <TextInput
                      label={"Dataset Name"}
                      placeholder={"Enter name"}
                      {...form.register("dataset")}
                      className="md:text-sm 2xl:text-base"
                    />
                  </div>

                  <div className="p-2 w-1/2">
                    <TextInput
                      label={"Subscriber OU"}
                      placeholder={"Enter name"}
                      {...form.register("subscriberOU")}
                      className="md:text-sm 2xl:text-base"
                    />
                  </div>

                  <div className="flex justify-between w-full p-2 text-md text-gray-700 -mb-2 font-medium">
                    <span>Status</span>
                    <Switch.Root
                      className="w-[42px] h-[25px] bg-gray-200 rounded-full shadow-lg data-[state=checked]:bg-drio-red outline-none cursor-pointer"
                      checked={checkedStatus}
                      onCheckedChange={() => setCheckedStatus(!checkedStatus)}
                    >
                      <Switch.Thumb className="flex items-center justify-center w-[21px] h-[21px] bg-white rounded-full shadow-sm transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]">
                        {checkedStatus ? (
                          <HiCheck className="text-gray-400" />
                        ) : (
                          <HiX className="text-gray-400" />
                        )}
                      </Switch.Thumb>
                    </Switch.Root>
                  </div>

                  <div className="p-2 flex flex-col gap-y-2">
                    <div className="flex">
                      <Checkbox.Root
                        className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                        checked={true}
                        onCheckedChange={() => {}}
                      >
                        <Checkbox.Indicator className="text-white">
                          <HiCheck />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label htmlFor="" className="text-gray-700 font-medium">
                        Success
                      </label>
                    </div>

                    <div className="flex">
                      <Checkbox.Root
                        className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                        checked={true}
                        onCheckedChange={() => {}}
                      >
                        <Checkbox.Indicator className="text-white">
                          <HiCheck />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label htmlFor="" className="text-gray-700 font-medium">
                        Error
                      </label>
                    </div>
                  </div>

                  <div className="w-full flex justify-end -ml-2">
                    <Switch.Root
                      className="w-[42px] h-[25px] bg-gray-200 rounded-full shadow-lg data-[state=checked]:bg-drio-red outline-none cursor-pointer"
                      checked={checkedCountry}
                      onCheckedChange={() => setCheckedCountry(!checkedCountry)}
                    >
                      <Switch.Thumb className="flex items-center justify-center w-[21px] h-[21px] bg-white rounded-full shadow-sm transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]">
                        {checkedCountry ? (
                          <HiCheck className="text-gray-400" />
                        ) : (
                          <HiX className="text-gray-400" />
                        )}
                      </Switch.Thumb>
                    </Switch.Root>
                  </div>

                  <div className="p-2 w-full relative">
                    <SelectInput
                      label={"Country"}
                      registerName="country"
                      placeholder={"Select Country"}
                      className="md:text-sm 2xl:text-base"
                      options={
                        Country.getAllCountries().map((country) => ({
                          label: country.name,
                          value: country.isoCode,
                        })) ?? []
                      }
                    />
                  </div>
                </div>

                <div className="px-2 py-2 flex gap-4 justify-center w-full mt-4">
                  <Button type="button" intent={`secondary`} className="w-full">
                    <span className="inline-flex justify-center w-full">
                      Cancel
                    </span>
                  </Button>

                  <Button
                    type="button"
                    intent={`primary`}
                    className="w-full"
                    onClick={() => onSubmit(form.getValues())}
                  >
                    <span className="inline-flex justify-center w-full">
                      Apply
                    </span>
                  </Button>
                </div>
              </div>
            </Form>
          </Layout>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default SortLogsPopover;
