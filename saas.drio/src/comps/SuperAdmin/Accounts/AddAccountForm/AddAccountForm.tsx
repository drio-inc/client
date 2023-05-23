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

import { setRows } from "@/state/slices/adminAccountSlice";
import { useAddAccountMutation } from "@/state/services/apiService";
import { setOpenModal } from "@/state/slices/uiSlice";

const nameFields = [
  {
    name: "name",
    label: "Account Name*",
    type: "text",
    placeholder: "Name",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter your description",
  },
];

const detailFields = [
  {
    name: "rootAdminName",
    label: "Root Admin Name",
    type: "text",
    placeholder: "Account root admin",
  },
  {
    name: "rootAdminID",
    label: "Root Admin ID",
    type: "text",
    placeholder: "Enter your ID",
  },
];

const contactFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "First Name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Last Name",
  },
  {
    name: "email",
    label: "Enter",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "contactNumber",
    label: "Contact Number",
    type: "text",
    placeholder: "Enter your number",
  },
];

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),
  address: z.string().nonempty("Please Enter a value"),
  description: z.string().nonempty("Please Enter a value"),
  rootAdminName: z.string().nonempty("Please Enter a value"),
  rootAdminID: z.string().nonempty("Please Enter a value"),
  firstName: z.string().nonempty("Please Enter a value"),
  lastName: z.string().nonempty("Please Enter a value"),
  email: z.string().nonempty("Please Enter a value"),
  contactNumber: z.string().nonempty("Please Enter a value"),
});

type FormData = z.infer<typeof schema>;
type FormKeyTypes = keyof FormData;

export default function AddAccountForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [addAccount, result] = useAddAccountMutation();
  const { rows } = useAppSelector((state) => state.adminAccount);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await addAccount({
        ...data,
      }).unwrap();

      dispatch(setRows([...rows, res]));
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }

    form.reset();
    dispatch(setOpenModal(false));
  };

  return (
    <>
      <Layout>
        <Form form={form} onSubmit={onSubmit} className="min-w-full">
          <div className="w-full mx-auto bg-white p-8 rounded-lg">
            <h2 className="text-gray-700 text-2xl font-bold my-4">
              Account Information
            </h2>

            <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50 my-4">
              {nameFields.map((field) => (
                <div className="px-4 py-2 w-full" key={field.name}>
                  <TextInput
                    type={field.type}
                    className="md:text-sm 2xl:text-base"
                    {...form.register(field.name as FormKeyTypes)}
                    label={field.label}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>

            <h2 className="text-gray-700 text-sm my-2">Account Details</h2>

            <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50 my-4">
              {detailFields.map((field) => (
                <div className="px-4 py-2 w-full md:w-1/2" key={field.name}>
                  <TextInput
                    type={field.type}
                    className="md:text-sm 2xl:text-base"
                    {...form.register(field.name as FormKeyTypes)}
                    label={field.label}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>

            <h2 className="text-gray-700 text-sm my-2">
              Primary Contact Information
            </h2>

            <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50 my-4">
              {contactFields.map((field) => (
                <div className="px-4 py-2 w-full md:w-1/2" key={field.name}>
                  <TextInput
                    type={field.type}
                    className="md:text-sm 2xl:text-base"
                    {...form.register(field.name as FormKeyTypes)}
                    label={field.label}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>

            <div className="py-2 flex justify-center md:justify-end w-full mt-4">
              <Button
                type="button"
                intent={`secondary`}
                onClick={() => dispatch(setOpenModal(false))}
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
                <span className="inline-flex justify-center w-full">Add</span>
              </Button>
            </div>
          </div>
        </Form>
      </Layout>
    </>
  );
}
