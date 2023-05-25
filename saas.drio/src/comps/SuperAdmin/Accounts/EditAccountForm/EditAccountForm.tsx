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

import { useEditAccountMutation } from "@/state/services/apiService";
import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/adminAccountSlice";

const schema = z.object({
  account: z.string().nonempty("Please Enter a value"),
  ous: z.string().nonempty("Please Enter a value"),
  authentication: z.string().nonempty("Please Enter a value"),
  dsPublished: z.string().nonempty("Please Enter a value"),
  contract: z.string().nonempty("Please Enter a value"),
  frequency: z.string().nonempty("Please Enter a value"),
  alerts: z.string().nonempty("Please Enter a value"),
});

type FormData = z.infer<typeof schema>;

export default function EditAccountForm({ row }: TableRow) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [editAccount, result] = useEditAccountMutation();
  const adminAccountState = useAppSelector((state) => state.adminAccount);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await editAccount({
        ...data,
        id: row.id,
      }).unwrap();

      dispatch(
        setRows(
          adminAccountState.rows.map((row) => (row.id === res.id ? res : row))
        )
      );

      dispatch(setCloseModal("editAccountForm"));
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
          <div className="w-full mx-auto bg-white p-8 rounded-lg">
            <h2 className="text-gray-700 text-2xl font-bold mb-4">
              Edit Account
            </h2>
            <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50">
              <div className="px-4 py-2 w-full md:w-1/2">
                <div className="relative">
                  <TextInput
                    label="Account"
                    defaultValue={row.account}
                    {...form.register("account")}
                    placeholder="Enter your account"
                  />
                </div>
              </div>

              <div className="px-4 py-2 w-full md:w-1/2">
                <div className="relative">
                  <TextInput
                    defaultValue={row.ous}
                    label="Organization Units"
                    placeholder="Enter OUs"
                    {...form.register("ous")}
                  />
                </div>
              </div>

              <div className="px-4 py-2 w-full md:w-1/2">
                <div className="relative">
                  <TextInput
                    label="Authentication"
                    defaultValue={row.authentication}
                    placeholder="Enter Authentication"
                    {...form.register("authentication")}
                  />
                </div>
              </div>

              <div className="px-4 py-2 w-full md:w-1/2">
                <div className="relative">
                  <TextInput
                    label="Datasets published"
                    defaultValue={row.datasetsPublished}
                    placeholder="Enter datasets published"
                    {...form.register("dsPublished")}
                  />
                </div>
              </div>

              <div className="px-4 py-2 w-full md:w-1/2">
                <div className="relative">
                  <TextInput
                    label="Public/contract"
                    placeholder="Enter contract"
                    {...form.register("contract")}
                    defaultValue={row.publicContractDatasets}
                  />
                </div>
              </div>

              <div className="px-4 py-2 w-full md:w-1/2">
                <div className="relative">
                  <TextInput
                    label="Daily Usage Frequency"
                    placeholder="Enter frequency"
                    {...form.register("frequency")}
                    defaultValue={row.dailyUsageFrequency}
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
            <div className="py-2 flex justify-center md:justify-end w-full mt-4">
              <Button
                type="button"
                intent={`secondary`}
                onClick={() => dispatch(setCloseModal("editAccountForm"))}
                className="w-full md:w-auto mr-2 md:mr-6"
              >
                <span className="inline-flex justify-center w-full">
                  Cancel
                </span>
              </Button>

              <Button
                intent={`primary`}
                className="w-full md:w-auto"
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
    </>
  );
}
