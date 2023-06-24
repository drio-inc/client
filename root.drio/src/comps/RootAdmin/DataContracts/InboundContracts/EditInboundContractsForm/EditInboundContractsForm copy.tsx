import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setRows } from "@/state/slices/datasetSlice";
import { setCloseModal } from "@/state/slices/uiSlice";

import { HiPlus, HiX } from "react-icons/hi";
import { useUpdateDatasetMutation } from "@/state/services/apiService";

import Image from "next/image";
import { AiFillCaretRight } from "react-icons/ai";

const schema = z.object({
  dataSource: z.string({
    required_error: "Please select an option",
  }),

  topic: z.string({
    required_error: "Please select an option",
  }),

  baseURL: z
    .string()
    .nonempty("Please Enter a value")
    .url("Please enter a valid URL"),

  name: z.string().nonempty("Please Enter a value"),

  file: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditInboundContractsForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [update, result] = useUpdateDatasetMutation();

  const datasetState = useAppSelector((state) => state.dataset);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await update({
        ...data,
        id: row?.id,
      }).unwrap();

      dispatch(
        setRows(datasetState.rows.map((row) => (row.id === res.id ? res : row)))
      );

      showAlert("Dataset updated successfully", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }

    form.reset();
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Layout>
        <div className="flex items-center justify-center bg-white mb-4 py-12 rounded-lg">
          <div className="rounded-full shadow-xl h-20 w-20 flex justify-center items-center mr-4 -mt-4">
            <Image
              src="/images/DJI_Innovations.png"
              alt="contract"
              width={40}
              height={40}
            />
          </div>
          <h2 className="text-gray-700 font-medium">
            Contract created by DT for B Bank <br /> to allow Access to DT’s
            datasets
          </h2>
        </div>

        <Form form={form} onSubmit={onSubmit}>
          <div className="mx-auto bg-white p-4 rounded-lg max-w-5xl">
            <div className="flex flex-wrap -m-2 rounded-lg my-4">
              <div className="px-4 py-2 w-1/2">
                <SelectInput
                  placeholder={"Select"}
                  registerName="dataSource"
                  label="Data Sharing Contract with"
                  className="md:text-sm 2xl:text-base"
                  options={[
                    { label: "My Kafka 1", value: "my_kafka_1" },
                    { label: "Cassandra-Q", value: "cassandra_q" },
                    { label: "Retail Kafka", value: "retail_kafka" },
                  ]}
                />
              </div>

              <div className="px-4 py-2 w-1/2">
                <SelectInput
                  registerName="dataSource"
                  className="md:text-sm 2xl:text-base"
                  label={"Organization/Business Unit"}
                  placeholder={"Organization/Business Unit"}
                  options={[
                    { label: "All", value: "all" },
                    { label: "MySQL", value: "mysql" },
                    { label: "Purchase", value: "purchase" },
                  ]}
                />
              </div>

              <div className="px-4 py-2 w-1/2">
                <TextInput
                  label={"Start Date"}
                  placeholder={"Jan 12.2023"}
                  {...form.register("baseURL")}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-1/2">
                <SelectInput
                  registerName="dataSource"
                  label={"Duration"}
                  className="md:text-sm 2xl:text-base"
                  placeholder={"6 months"}
                  options={[
                    { label: "All", value: "all" },
                    { label: "MySQL", value: "mysql" },
                    { label: "Purchase", value: "purchase" },
                  ]}
                />
              </div>

              {/* App Personas */}
              <div className="flex justify-between w-full px-4 my-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    App Personas Allowed
                  </h3>

                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-2">
                      <button className="bg-drio-red text-white p-1 rounded-md">
                        <HiX className="w-5 h-5" />
                      </button>
                      <span className="text-blue-500 underline"> Loan App</span>
                      <AiFillCaretRight className="text-blue-500 " />
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="bg-drio-red text-white p-1 rounded-md">
                        <HiX className="w-5 h-5" />
                      </button>
                      <span className="text-blue-500 underline">Marketing</span>
                      <AiFillCaretRight className="text-blue-500 " />
                    </div>
                  </div>
                </div>

                <div>
                  <Button intent={`tertiary`} className="w-full">
                    <span className="inline-flex justify-center items-center w-full">
                      Add New Persona
                      <HiPlus className="ml-2" />
                    </span>
                  </Button>
                </div>
              </div>

              {/* Add Limitations */}

              <div className="px-4">
                <div className="flex justify-between items-center">
                  <h3>Max Number of Personas</h3>
                  <div className="w-1/2">
                    <TextInput
                      label={""}
                      placeholder={"2"}
                      {...form.register("baseURL")}
                      className="md:text-sm 2xl:text-base"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <h3>Max Number of Accessors</h3>
                  <div className="w-1/2">
                    <TextInput
                      label={""}
                      placeholder={"2"}
                      {...form.register("baseURL")}
                      className="md:text-sm 2xl:text-base"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <h3>Max Daily Access Frequency Limit</h3>
                  <div className="w-1/2">
                    <TextInput
                      label={""}
                      placeholder={"2"}
                      {...form.register("baseURL")}
                      className="md:text-sm 2xl:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Datasets Covered */}
              <div className="flex justify-between w-full my-4 px-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Datasets Covered
                  </h3>

                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-2">
                      <span>All Personas</span>
                      <span className="underline">
                        : /api/2022-10-31/ account/Cox/orgunit/dt.com/*
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span>All Personas</span>
                      <span className="underline">
                        : /api/2022-10-31/ account/Cox/orgunit/dt.com/*
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <Button intent={`tertiary`} className="w-full">
                    <span className="inline-flex justify-center items-center w-full">
                      Add New Dataset
                      <HiPlus className="ml-2" />
                    </span>
                  </Button>
                </div>
              </div>

              {/* Legal Addendums */}

              <div className="flex justify-between w-full my-4 px-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Legal Addendums
                  </h3>

                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500 underline">
                        coxautomotive.com/legal/privacy-regulatory.pdf
                      </span>
                      <AiFillCaretRight className="text-blue-500" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-blue-500 underline">
                        coxautomotive.com/legal/privacy-regulatory.pdf
                      </span>
                      <AiFillCaretRight className="text-blue-500 " />
                    </div>
                  </div>
                </div>

                <div>
                  <Button intent={`tertiary`} className="w-full">
                    <span className="inline-flex justify-center items-center w-full">
                      Add New Addendum
                      <HiPlus className="ml-2" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Submit/Cancel */}
            <div className="px-2 py-2 flex gap-4 justify-center w-full mt-4">
              <Button
                type="button"
                intent={`secondary`}
                className="w-full"
                onClick={() => dispatch(setCloseModal("editDatasetForm"))}
              >
                <span className="inline-flex justify-center w-full">
                  Cancel
                </span>
              </Button>

              <Button
                type="button"
                onClick={() => onSubmit(form.getValues())}
                intent={`primary`}
                className="w-full"
                isLoading={result.isLoading}
              >
                <span className="inline-flex justify-center w-full">
                  Update
                </span>
              </Button>
            </div>
          </div>
        </Form>
      </Layout>
    </div>
  );
}
