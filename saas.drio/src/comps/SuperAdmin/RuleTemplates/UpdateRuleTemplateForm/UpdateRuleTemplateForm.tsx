import Button from "@ui/Button";
import { useState } from "react";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";

const schema = z.object({
  sku: z.string({
    required_error: "Please Enter a value",
  }),
  licenseType: z.string({
    required_error: "Please Enter a value",
  }),
  licenseKey: z.string().nonempty("Please Enter a value"),
});

type FormData = z.infer<typeof schema>;

export default function UpdateRuleTemplateForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
    } catch (err: any) {
      showAlert(err?.data?.message ?? "Something went wrong. Please try again.", "error");
    }

    form.reset();
    dispatch(setCloseModal("updateRuleTemplateForm"));
  };

  return (
    <>
      <Layout>
        <Form form={form} onSubmit={onSubmit} className="min-w-[22vw]">
          <div className="w-full mx-auto bg-white p-8 rounded-lg">
            <h2 className="text-gray-700 text-2xl font-bold my-4 text-center">
              Update Rule Template
            </h2>

            <p className="text-gray-700 text-center">Form to be defined</p>

            <div className="py-2 flex justify-center w-full mt-4">
              <Button
                type="button"
                intent={`secondary`}
                className="w-full md:w-auto "
                onClick={() => dispatch(setCloseModal("updateRuleTemplateForm"))}
              >
                <span className="inline-flex justify-center w-full">Cancel</span>
              </Button>
            </div>
          </div>
        </Form>
      </Layout>
    </>
  );
}
