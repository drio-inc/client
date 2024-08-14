import Button from "@ui/Button";
import { useEffect, useState } from "react";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { useZodForm, Form } from "@ui/Forms/Form";
import { SubmitHandler, useFieldArray } from "react-hook-form";

import { HiOutlineTrash } from "react-icons/hi";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { setRuleRows } from "@/state/slices/contractRuleSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  dataset: z.string({
    required_error: "Please select a dataset",
  }),

  //   defaultAllow: z.boolean({
  //     required_error: "Please select an option",
  //   }),

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
  { label: "SAP Inventory", value: "sap_inventory" },
  { label: "Salesforce Orders", value: "salesforce_orders" },
  { label: "Quotes Request", value: "quotes_request" },
  { label: "MKT Data", value: "mkt_data" },
  { label: "Accidents", value: "accidents" },
  { label: "Dealer Sales", value: "dealer_sales" },
  { label: "Shipping Data", value: "shipping_data" },
];

const allowOptions = [
  { label: "True", value: true },
  { label: "False", value: false },
];

const actionOptions = [
  { label: "Mask Data", value: "mask_data" },
  { label: "Keep Data", value: "keep_data" },
  { label: "Index Data", value: "index_data" },
  { label: "Remove Data", value: "remove_data" },
  { label: "Generate Data", value: "generate_data" },
  { label: "Obfuscate Data", value: "obfuscate_data" },
  { label: "Quarantine Data", value: "quarantine_data" },
  { label: 'Convert "FName"', value: "convert_fname" },

  { label: "Add New", value: "add_new" },
];

export default function EditRuleForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [showActionField, setShowActionField] = useState(false);
  const { ruleRows } = useAppSelector((state) => state.contractRule);
  const triggerActionState = useAppSelector((state) => state.triggerAction);

  const triggerActionRows = triggerActionState.rows.map((row) => ({
    label: row.name,
    value: row.name.toLowerCase().replace(" ", "_"),
  }));

  const enhancedActionOptions = [...triggerActionRows, ...actionOptions];

  useEffect(() => {
    if (row.action !== undefined) setShowActionField(true);
  }, [row]);

  console.log(enhancedActionOptions.find((option) => option.value.toLowerCase() === row.action));

  const form = useZodForm({
    schema: schema,
    defaultValues: {
      subrules: row?.subrules.map((subrule: TableRow) => ({
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

  const onAddNew = (selectedOption?: string) => {
    if (selectedOption === "add_new") {
      dispatch(setCloseModal("editRuleForm"));
      dispatch(setOpenModal("addTriggerActionForm"));
      return;
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const updatedRules = ruleRows.map((rule) => {
      if (rule?.id === row.id) {
        return {
          ...rule,
          ...data,
        };
      }

      return rule;
    });

    dispatch(setRuleRows(updatedRules));

    form.reset();
    dispatch(setCloseModal("editRuleForm"));
    showAlert("Rule updated successfully", "success");
  };

  const addNewRule = (condition: string, index: number) => {
    setShowActionField(true);

    if (condition === "none") {
      // if (index === 0) {
      //   setShowActionField(false);
      //   form.setValue(`action`, undefined);
      // }

      if (fields.length === 1) return;

      const fieldsToRemove = [];

      for (let i = index + 1; i < fields.length; i++) {
        fieldsToRemove.push(i);
      }

      remove(fieldsToRemove);
    } else {
      // setShowActionField(true);
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

    // if (index - 1 === 0) {
    //   setShowActionField(false);
    //   form.setValue(`action`, undefined);
    // }

    if (index === fields.length - 1) {
      form.setValue(`subrules.${index - 1}.subrule`, "none");
    }

    remove(index);
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white p-6 rounded-lg w-[60vw]">
          <h2 className="text-gray-700 text-2xl font-bold">Edit Contract Rule</h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4 border bg-gray-50">
            <div className="px-4 py-2 w-full lg:w-1/2 2xl:w-1/3">
              <TextInput
                label={"Rule Name"}
                defaultValue={row?.name}
                {...form.register("name")}
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
                  datasetOptions.find((option) => option.value === row?.dataset) ?? {
                    label: "",
                    value: "",
                  }
                }
              />
            </div>

            {/* <div className="px-4 py-2 w-full lg:w-1/2 2xl:w-1/3">
              <SelectInput
                options={allowOptions}
                placeholder={"Select"}
                label={"Default Allow"}
                registerName="defaultAllow"
                className="md:text-sm 2xl:text-base"
                defaultSelectedValue={allowOptions.find(
                  (option) => option.value === row.defaultAllow
                )}
              />
            </div> */}
          </div>

          {fields.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-wrap md:flex-nowrap items-center -m-2 rounded-lg my-4 border bg-gray-50"
            >
              <div className="w-full flex flex-wrap flex-grow">
                <div className="px-4 py-2 w-full lg:w-1/3 2xl:w-1/4">
                  <SelectInput
                    label={"Select Metadata"}
                    placeholder={"Select metadata"}
                    className="md:text-sm 2xl:text-base"
                    registerName={`subrules.${index}.metadata`}
                    options={[
                      { label: "Product Name", value: "product_name" },
                      { label: "SKU", value: "sku" },
                      { label: "Price", value: "price" },
                      { label: "PII", value: "pii" },
                      { label: "Dealer Name", value: "dealer_name" },
                      { label: "Request", value: "Request Location" },
                      { label: "User Location", value: "User Location" },
                      { label: "Product Identity", value: "product_identity" },
                      { label: "Volume", value: "volume" },
                      { label: "Weight", value: "weight" },
                      { label: "Geolocation", value: "geolocation" },
                      { label: "Model", value: "model" },
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
                      { label: "!= (Not equal to)", value: "!=" },
                      { label: "Regex", value: "regex" },
                    ]}
                  />

                  {form.formState.errors.subrules && (
                    <p className="text-xs md:text-sm text-drio-red">
                      {form.formState.errors.subrules[index]?.conditions?.message}
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
                label={"Add Trigger"}
                registerName="action"
                placeholder={"Select"}
                onChangeCustomAction={onAddNew}
                options={enhancedActionOptions}
                className="md:text-sm 2xl:text-base"
                defaultSelectedValue={
                  enhancedActionOptions.find(
                    (option) => option.value.toLowerCase() === row.action
                  ) ?? {
                    label: "",
                    value: "",
                  }
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
