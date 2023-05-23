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

import { useSetLDAPMutation } from "@/state/services/apiService";
import { setOpenModal } from "@/state/slices/uiSlice";

const schema = z.object({
  ou: z.string().nonempty("Please Enter a value"),
  authentication: z.string().nonempty("Please Enter a value"),
});

type FormData = z.infer<typeof schema>;

export default function AddOrgAccountForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [setLDAP, result] = useSetLDAPMutation();
  const uiState = useAppSelector((state) => state.ui);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    // try {
    //   const res = await setLDAP({
    //     ...data,
    //   }).unwrap();

    //   dispatch(setUser(res));
    //   dispatch(setAuthenticated(true));
    // } catch (err: any) {
    //   showAlert(
    //     err?.data?.message ?? "Something went wrong. Please try again."
    //   );
    // }
  };

  return (
    <>
      <Layout>
        <Form form={form} onSubmit={onSubmit} className="min-w-full">
          <div className="max-w-md w-full mx-auto bg-white p-4 rounded-lg">
            <h2 className="text-gray-700 text-2xl font-bold mb-4 text-center">
              Add New Organization Unit
            </h2>
            <div className="flex flex-wrap p-2 rounded-lg">
              <div className="px-4 py-2 w-full">
                <div className="relative">
                  <TextInput
                    label="Organization Unit"
                    placeholder="Enter OU"
                    {...form.register("ou")}
                  />
                </div>
              </div>

              <div className="px-4 py-2 w-full">
                <div className="relative">
                  <TextInput
                    label="Authentication"
                    placeholder="Enter Authentication"
                    {...form.register("authentication")}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 flex justify-center w-full">
              <Button
                type="button"
                intent={`secondary`}
                onClick={() => dispatch(setOpenModal(!uiState.openModal))}
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
