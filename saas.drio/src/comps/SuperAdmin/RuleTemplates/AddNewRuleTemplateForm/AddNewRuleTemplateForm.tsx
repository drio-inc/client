import Button from "@ui/Button";
import { SelectInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";

import { useCreateLicenseMutation } from "@/api/resources/licenses";
import { setRows } from "@/state/slices/licensingSlice";

const schema = z.object({
  account: z.string({
    required_error: "Please Enter a value",
  }),
  sku: z.string({
    required_error: "Please Enter a value",
  }),
  licenseType: z.string({
    required_error: "Please Enter a value",
  }),
});

type FormData = z.infer<typeof schema>;

export default function AddNewLicenseForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [create, result] = useCreateLicenseMutation();
  const adminAccountState = useAppSelector((state) => state.account);
  const licenseState = useAppSelector((state) => state.licensing);

  const options = adminAccountState?.rows.length
    ? adminAccountState?.rows?.map((row) => {
        return {
          label: row.name,
          value: row.name.split(" ").join("_").toLowerCase(),
        };
      })
    : [];

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await create({
        ...data,
      }).unwrap();

      if (res) {
        dispatch(setRows([...licenseState.rows, res]));
        showAlert("License created successfully", "success");
      }
    } catch (err: any) {
      err;

      showAlert(err?.data?.message ?? "Something went wrong. Please try again.", "error");
    }

    form.reset();
    dispatch(setCloseModal("addNewRuleTemplateForm"));
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit} className="min-w-[22vw]">
        <div className="w-full mx-auto bg-white p-8 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-bold my-4 text-center">
            Add New Rule Template
          </h2>

          <p className="text-gray-700 text-center">Form to be defined</p>

          <div className="py-2 flex justify-center w-full mt-4">
            <Button
              type="button"
              intent={`secondary`}
              className="w-full md:w-auto"
              onClick={() => dispatch(setCloseModal("addNewRuleTemplateForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
