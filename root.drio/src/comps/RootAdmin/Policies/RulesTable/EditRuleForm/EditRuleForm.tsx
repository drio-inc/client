import Button from "@ui/Button";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { faker } from "@faker-js/faker";

import { z } from "zod";
import { useZodForm, Form } from "@ui/Forms/Form";
import { SubmitHandler, useFieldArray } from "react-hook-form";

import { HiOutlineTrash } from "react-icons/hi";
import { setCloseModal } from "@/state/slices/uiSlice";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import { setRuleRows } from "@/state/slices/policiesSlice";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  dataset: z.string({
    required_error: "Please select a dataset",
  }),

  defaultAllow: z.boolean({
    required_error: "Please select an option",
  }),

  subrules: z
    .array(
      z.object({
        metadata: z
          .string({
            required_error: "Please select a metadata",
          })
          .nonempty("Please select a metadata"),

        conditions: z
          .string({
            required_error: "Please select a condition",
          })
          .nonempty("Please select a condition"),

        value: z.string().nonempty("Please enter a value"),

        subrule: z
          .string({
            required_error: "Please select a subrule",
          })
          .nonempty("Please select a subrule"),
      })
    )
    .nonempty("Please add at least one subrule"),

  action: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const datasetOptions = [
  { label: "MKT Data", value: "mkt_data" },
  { label: "Accidents", value: "accidents" },
  { label: "Dealer Sales", value: "dealer_sales" },
];

const allowOptions = [
  { label: "True", value: true },
  { label: "False", value: false },
];

const actionOptions = [
  { label: "Mask", value: "mask" },
  { label: "Keep", value: "keep" },
  { label: "Index", value: "index" },
  { label: "Remove", value: "remove" },
  { label: "Generate", value: "generate" },
  { label: "Obfuscate", value: "obfuscate" },
  { label: "Quarantine", value: "quarantine" },
  { label: 'Convert "FName"', value: "convert_fname" },
];

export default function EditRuleForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [showActionField, setShowActionField] = useState(false);

  useEffect(() => {
    if (row.length > 1) setShowActionField(true);
  }, [row]);

  const form = useZodForm({
    schema: schema,
    defaultValues: {
      subrules: row?.map((subrule: TableRow) => ({
        value: subrule.value,
        subrule: subrule.subrule,
        metadata: subrule.metadata,
        conditions: subrule.conditions,
      })) ?? [
        {
          value: "",
          subrule: "",
          metadata: "",
          conditions: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subrules",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const rules =
      data.subrules && data.subrules.length > 0
        ? data.subrules.map((subrule, index) => ({
            ...subrule,
            id: uuidv4(),
            action: data.action,
            name: index === 0 ? data.name : "",
            dataset: data.dataset.replaceAll("_", " "),
            defaultAllow: data.defaultAllow ? "True" : "False",
          }))
        : [];

    dispatch(setRuleRows([...rules]));

    form.reset();
    dispatch(setCloseModal("editRuleForm"));
    showAlert("Rule updated successfully", "success");
  };

  const addNewRule = (condition: string, index: number) => {
    if (condition === "none") {
      if (index === 0) {
        setShowActionField(false);
        form.setValue(`action`, undefined);
      }

      if (fields.length === 1) return;

      const fieldsToRemove = [];

      for (let i = index + 1; i < fields.length; i++) {
        fieldsToRemove.push(i);
      }

      remove(fieldsToRemove);
    } else {
      setShowActionField(true);
      if (index === fields.length - 1) {
        append({
          value: "",
          subrule: "",
          metadata: "",
          conditions: "",
        });
      }
    }
  };

  const deleteRule = (index: number) => {
    if (fields.length === 1) return;

    if (index - 1 === 0) {
      setShowActionField(false);
      form.setValue(`action`, undefined);
    }

    if (index === fields.length - 1) {
      form.setValue(`subrules.${index - 1}.subrule`, "none");
    }

    remove(index);
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white p-6 rounded-lg w-[60vw]">
          <h2 className="text-gray-700 text-2xl font-bold">Edit Rules</h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4 border bg-gray-50">
            <div className="px-4 py-2 w-full lg:w-1/2 2xl:w-1/3">
              <TextInput
                label={"Rule Name"}
                {...form.register("name")}
                defaultValue={row[0].name}
                placeholder={"Enter rule name"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full lg:w-1/2 2xl:w-1/3">
              <SelectInput
                placeholder={"Select"}
                registerName="dataset"
                label={"Select Dataset"}
                options={datasetOptions}
                className="md:text-sm 2xl:text-base"
                defaultSelectedValue={
                  datasetOptions.find(
                    (option) => option.label.toLowerCase() === row[0].dataset
                  ) ?? { label: "", value: "" }
                }
              />
            </div>

            <div className="px-4 py-2 w-full lg:w-1/2 2xl:w-1/3">
              <SelectInput
                options={allowOptions}
                placeholder={"Select"}
                label={"Default Allow"}
                registerName="defaultAllow"
                className="md:text-sm 2xl:text-base"
                defaultSelectedValue={allowOptions.find(
                  (option) => option.label === row[0].defaultAllow
                )}
              />
            </div>
          </div>

          {fields.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-wrap md:flex-nowrap items-center -m-2 rounded-lg my-4 border bg-gray-50"
            >
              <div className="w-full flex flex-wrap flex-grow">
                <div className="px-4 py-2 w-full lg:w-1/3 2xl:w-1/4">
                  <SelectInput
                    placeholder={"Select metadata"}
                    label={"Select Metadata"}
                    className="md:text-sm 2xl:text-base"
                    registerName={`subrules.${index}.metadata`}
                    options={[
                      { label: "Request", value: "Request Location" },
                      { label: "User Location", value: "User Location" },
                    ]}
                  />

                  {form.formState.errors.subrules && (
                    <p className="text-xs md:text-sm text-drio-red">
                      {form.formState.errors.subrules[index]?.metadata?.message}
                    </p>
                  )}
                </div>

                <div className="px-4 py-2 w-full lg:w-1/3 2xl:w-1/4">
                  <SelectInput
                    label={"Conditions"}
                    placeholder={"Add conditions"}
                    className="md:text-sm 2xl:text-base"
                    registerName={`subrules.${index}.conditions`}
                    options={[
                      { label: "< (Less than)", value: "<" },
                      { label: "> (Greater than)", value: ">" },
                      { label: "= (Equal to)", value: "=" },
                      { label: "Regex", value: "regex" },
                    ]}
                  />

                  {form.formState.errors.subrules && (
                    <p className="text-xs md:text-sm text-drio-red">
                      {
                        form.formState.errors.subrules[index]?.conditions
                          ?.message
                      }
                    </p>
                  )}
                </div>

                <div className="px-4 py-2 w-full lg:w-1/3 2xl:w-1/4">
                  <TextInput
                    label={"Conditional Value"}
                    placeholder={"Enter value"}
                    className="md:text-sm 2xl:text-base"
                    {...form.register(`subrules.${index}.value`)}
                  />

                  {form.formState.errors.subrules && (
                    <p className="text-xs md:text-sm text-drio-red">
                      {form.formState.errors.subrules[index]?.value?.message}
                    </p>
                  )}
                </div>

                <div className="px-4 py-2 w-full lg:w-1/3 2xl:w-1/4">
                  <SelectInput
                    label={"Add Subrule"}
                    placeholder={"Add subrule"}
                    className="md:text-sm 2xl:text-base"
                    registerName={`subrules.${index}.subrule`}
                    onChangeCustomAction={(c) => addNewRule(c as string, index)}
                    options={[
                      { label: "AND", value: "and" },
                      { label: "OR", value: "or" },
                      { label: "None", value: "none" },
                    ]}
                  />

                  {form.formState.errors.subrules && (
                    <p className="text-xs md:text-sm text-drio-red">
                      {form.formState.errors.subrules[index]?.subrule?.message}
                    </p>
                  )}
                </div>
              </div>

              {fields.length > 1 && (
                <div className="p-2 mt-4">
                  <HiOutlineTrash
                    onClick={() => deleteRule(index)}
                    className="w-5 h-5 text-drio-red hover:text-drio-red-dark cursor-pointer"
                  />
                </div>
              )}
            </div>
          ))}

          {showActionField && (
            <div className="mx-auto px-8 pt-3 pb-4 w-full lg:w-1/2 2xl:w-1/3 bg-gray-50">
              <SelectInput
                label={"Add Action"}
                registerName="action"
                placeholder={"Select"}
                options={actionOptions}
                className="md:text-sm 2xl:text-base"
                defaultSelectedValue={
                  actionOptions.find(
                    (option) => option.label.toLowerCase() === row[0].action
                  ) ?? { label: "", value: "" }
                }
              />
            </div>
          )}

          <div className="px-2 py-4 flex gap-4 justify-end">
            <Button
              type="button"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("editRuleForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button intent={`primary`}>
              <span className="inline-flex justify-center w-full">Save</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}