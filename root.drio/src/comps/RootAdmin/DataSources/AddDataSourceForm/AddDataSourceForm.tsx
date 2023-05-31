import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import * as Checkbox from "@radix-ui/react-checkbox";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/dataSourceSlice";

import { HiCheck } from "react-icons/hi";

import { useState } from "react";
import { useAddDataSourceMutation } from "@/state/services/apiService";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),
  type: z.string({
    required_error: "Please select an option",
  }),
  endpoint: z.string().nonempty("Please Enter a value"),
  schemaURL: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function AddDataSourceForm() {
  const dispatch = useAppDispatch();
  const [visibility, setVisibility] = useState(false);
  const [addDataSource, result] = useAddDataSourceMutation();

  const dataSourceState = useAppSelector((state) => state.dataSource);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await addDataSource({
        ...data,
      }).unwrap();

      dispatch(setRows([...dataSourceState.rows, res]));
      showAlert("Data Source Added Successfully", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }

    form.reset();
    dispatch(setCloseModal("addDataSourceForm"));
  };

  return (
    <>
      <Layout>
        <Form form={form} onSubmit={onSubmit} className="">
          <div className="mx-auto bg-white p-4 rounded-lg max-w-[20vw]">
            <h2 className="text-gray-700 text-2xl font-bold text-center">
              Add New Data Source
            </h2>

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
                  registerName="type"
                  label={"Type"}
                  placeholder={"Enter Type"}
                  options={[
                    { label: "RabbitMQ", value: "rabbitmq" },
                    { label: "MongoDB", value: "mongodb" },
                    { label: "Kafka", value: "kafka" },
                    { label: "Cassandra", value: "cassandra" },
                  ]}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <TextInput
                  label={"Broker Endpoint"}
                  {...form.register("endpoint")}
                  placeholder={"Enter broker endpoint"}
                  className="md:text-sm 2xl:text-base"
                />
              </div>

              <div className="px-4 py-2 w-full">
                <div className="relative flex">
                  <Checkbox.Root
                    className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                    checked={visibility}
                    onCheckedChange={() => {
                      setVisibility(!visibility);
                    }}
                  >
                    <Checkbox.Indicator className="text-white">
                      <HiCheck />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="text-xs">
                    Is there any Schema-Registry available?
                  </span>
                </div>
              </div>

              {visibility && (
                <div className="px-4 py-2 w-full">
                  <TextInput
                    label={"Enter Schema-Registry URL"}
                    {...form.register("schemaURL")}
                    placeholder={"Enter URL"}
                    defaultValue={"https://my-schema-registry:8081"}
                    className="md:text-sm 2xl:text-base"
                  />
                </div>
              )}
            </div>

            <div className="py-2 px-2 flex w-full mt-4 gap-4">
              <Button
                type="button"
                intent={`secondary`}
                className="w-full"
                onClick={() => dispatch(setCloseModal("addDataSourceForm"))}
              >
                <span className="inline-flex justify-center w-full">
                  Cancel
                </span>
              </Button>

              <Button
                intent={`primary`}
                className="w-full"
                isLoading={result.isLoading}
              >
                <span className="inline-flex justify-center w-full">Add</span>
              </Button>
            </div>
          </div>
        </Form>
      </Layout>
    </>
  );
}
