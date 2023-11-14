import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { useZodForm, Form } from "@ui/Forms/Form";
import { SubmitHandler, useFieldArray } from "react-hook-form";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRuleRows } from "@/state/slices/policiesSlice";
import { useAddRuleMutation } from "@/api/resources/policies";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  dataset: z.string({
    required_error: "Please select a dataset",
  }),

  default_allow: z.boolean({
    required_error: "Please select an option",
  }),

  metadata: z.string({
    required_error: "Please select metadata",
  }),

  conditions: z.string({
    required_error: "Please select a condition",
  }),

  value: z.string().nonempty("Please Enter a value"),

  subrule: z.string({
    required_error: "Please select a subrule",
  }),

  action: z.string({
    required_error: "Please select an action",
  }),
});

type FormData = z.infer<typeof schema>;

export default function AddNewRuleForm() {
  const dispatch = useAppDispatch();
  const [addRule, result] = useAddRuleMutation();
  const policyState = useAppSelector((state) => state.policies);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await addRule({
        ...data,
      }).unwrap();

      dispatch(setRuleRows([...policyState.ruleRows, res]));

      showAlert("Rule added successfully", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }

    form.reset();
    dispatch(setCloseModal("addNewRuleForm"));
  };

  const addNewRule = (condition: string) => {};

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white p-6 rounded-lg w-[60vw]">
          <h2 className="text-gray-700 text-2xl font-bold">Policy Rules</h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4 border bg-gray-50">
            <div className="px-4 py-2 w-1/3">
              <TextInput
                label={"Rule Name"}
                {...form.register("name")}
                placeholder={"Enter rule name"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-1/3">
              <SelectInput
                placeholder={"Select"}
                registerName="dataset"
                label={"Select Dataset"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "MKT Data", value: "mkt_data" },
                  { label: "Accidents", value: "accidents" },
                  { label: "Dealer Sales", value: "dealer_sales" },
                ]}
              />
            </div>

            <div className="px-4 py-2 w-1/3">
              <SelectInput
                placeholder={"Select"}
                label={"Default Allow"}
                registerName="default_allow"
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "True", value: true },
                  { label: "False", value: false },
                ]}
              />
            </div>
          </div>

          <div className="flex flex-wrap -m-2 rounded-lg my-4 border bg-gray-50">
            <div className="px-4 py-2 w-1/4">
              <SelectInput
                placeholder={"Select"}
                registerName="metadata"
                label={"Select Metadata"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "Request", value: "Request Location" },
                  { label: "User Location", value: "User Location" },
                ]}
              />
            </div>

            <div className="px-4 py-2 w-1/4">
              <SelectInput
                label={"Conditions"}
                registerName="conditions"
                placeholder={"Add conditions"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "< (Less than)", value: "<" },
                  { label: "> (Greater than)", value: ">" },
                  { label: "= (Equal to)", value: "=" },
                  { label: "Regex", value: "regex" },
                ]}
              />
            </div>

            <div className="px-4 py-2 w-1/4">
              <TextInput
                label={"Conditional Value"}
                {...form.register("value")}
                placeholder={"Please enter a value"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-1/4">
              <SelectInput
                label={"Add Subrule"}
                registerName="subrule"
                placeholder={"Add Subrule"}
                className="md:text-sm 2xl:text-base"
                onChangeCustomAction={(c) => addNewRule(c as string)}
                options={[
                  { label: "AND", value: "and" },
                  { label: "OR", value: "or" },
                  { label: "None", value: "none" },
                ]}
              />
            </div>

            <div className="mx-auto px-4 py-2 w-1/4">
              <SelectInput
                label={"Add Action"}
                registerName="action"
                placeholder={"Select"}
                className="md:text-sm 2xl:text-base"
                options={[
                  { label: "Mask", value: "mask" },
                  { label: "Keep", value: "keep" },
                  { label: "Index", value: "index" },
                  { label: "Remove", value: "remove" },
                  { label: "Generate", value: "generate" },
                  { label: "Obfuscate", value: "obfuscate" },
                  { label: "Quarantine", value: "quarantine" },
                  { label: 'Convert "FName"', value: "convert_fname" },
                ]}
              />
            </div>
          </div>

          <div className="px-2 py-4 flex gap-4 justify-end mt-4">
            <Button
              type="button"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("addNewRuleForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button intent={`primary`} isLoading={result.isLoading}>
              <span className="inline-flex justify-center w-full">Save</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}

// import React from "react";
// import { useForm, useFieldArray, Controller } from "react-hook-form";

// export default function App() {
//   const { register, control, handleSubmit, reset, trigger, setError } = useForm(
//     {
//       // defaultValues: {}; you can populate the fields by this attribute
//     }
//   );
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "test",
//   });

//   return (
//     <form onSubmit={handleSubmit((data) => console.log(data))}>
//       <ul>
//         {fields.map((item, index) => (
//           <li key={item.id}>
//             <input {...register(`test.${index}.firstName`)} />
//             <Controller
//               render={({ field }) => <input {...field} />}
//               name={`test.${index}.lastName`}
//               control={control}
//             />
//             <button type="button" onClick={() => remove(index)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//       <button
//         type="button"
//         onClick={() => append({ firstName: "bill", lastName: "luo" })}
//       >
//         append
//       </button>
//       <input type="submit" />
//     </form>
//   );
// }
