import Button from "@ui/Button";
import { TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { useRouter } from "next/router";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { useEditOrgAccountMutation } from "@/state/services/apiService";
import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/adminOrgAccountSlice";

const schema = z.object({
  ou: z.string().nonempty("Please Enter a value"),
  authentication: z.string().nonempty("Please Enter a value"),
  dsPublished: z.string().nonempty("Please Enter a value"),
  contract: z.string().nonempty("Please Enter a value"),
  frequency: z.string().nonempty("Please Enter a value"),
  alerts: z.string().nonempty("Please Enter a value"),
});

type FormData = z.infer<typeof schema>;

export default function EditOrgAccountForm({ row }: TableRow) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [editOrgAccount, result] = useEditOrgAccountMutation();
  const adminOrgState = useAppSelector((state) => state.adminOrgAccount);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await editOrgAccount({
        ...data,
        id: row.id,
      }).unwrap();

      dispatch(
        setRows(
          adminOrgState.rows.map((row) => (row.id === res.id ? res : row))
        )
      );

      dispatch(setCloseModal("editOrgAccountForm"));
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      <Layout>
        <Form form={form} onSubmit={onSubmit} className="min-w-full">
          <div className="max-w-md w-full mx-auto bg-white p-4 rounded-lg">
            <h2 className="text-gray-700 text-2xl font-bold my-4 text-center">
              Edit Organization Unit
            </h2>
            <div className="flex flex-wrap p-2 rounded-lg">
              <div className="px-4 py-2 w-full">
                <div className="relative">
                  <TextInput
                    label="Organization Unit"
                    placeholder="Enter OU"
                    defaultValue={row.ou}
                    {...form.register("ou")}
                  />
                </div>
              </div>

              <div className="px-4 py-2 w-full">
                <div className="relative">
                  <TextInput
                    label="Authentication"
                    defaultValue={row.authentication}
                    placeholder="Enter Authentication"
                    {...form.register("authentication")}
                  />
                </div>
              </div>

              <div className="px-4 py-2 w-full">
                <div className="relative">
                  <TextInput
                    label="Datasets published"
                    defaultValue={row.dsPublished}
                    placeholder="Enter datasets published"
                    {...form.register("dsPublished")}
                  />
                </div>
              </div>

              <div className="px-4 py-2 w-full">
                <div className="relative">
                  <TextInput
                    label="Public/contract"
                    defaultValue={row.contract}
                    placeholder="Enter contract"
                    {...form.register("contract")}
                  />
                </div>
              </div>

              <div className="px-4 py-2 w-full">
                <div className="relative">
                  <TextInput
                    label="Daily Usage Frequency"
                    defaultValue={row.frequency}
                    placeholder="Enter frequency"
                    {...form.register("frequency")}
                  />
                </div>
              </div>

              <div className="px-4 py-2 w-full">
                <div className="relative">
                  <TextInput
                    label="Alerts (7 Days)"
                    defaultValue={row.alerts}
                    placeholder="Enter Alerts"
                    {...form.register("alerts")}
                  />
                </div>
              </div>
            </div>
            <div className="my-2 px-6 flex justify-center w-full">
              <Button
                type="button"
                intent={`secondary`}
                onClick={() => dispatch(setCloseModal("editOrgAccountForm"))}
                className="w-full mr-2 md:mr-6"
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
                <span className="inline-flex justify-center w-full">Save</span>
              </Button>
            </div>
          </div>
        </Form>
      </Layout>
    </>
  );
}
