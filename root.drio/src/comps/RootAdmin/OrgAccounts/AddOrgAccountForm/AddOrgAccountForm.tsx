import Button from "@ui/Button";
import { useEffect, useState } from "react";
import { Radio } from "react-aria-components";
import RadioGroup from "@/comps/ui/Forms/RadioGroup";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { useRouter } from "next/router";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import {
  useAddOrgAccountGoogleMutation,
  useAddOrgAccountOAuthMutation,
  useAddOrgAccountLDAPMutation,
} from "@/state/services/apiService";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/adminOrgAccountSlice";

const schema = z.object({
  ou: z.string().nonempty("Please Enter a value"),
  authentication: z.string({
    required_error: "Please select an option",
  }),

  clientID: z.string().nonempty("Please Enter a value").optional(),
  emailID: z.string().nonempty("Please Enter a value").optional(),

  ldapHost: z.string().nonempty("Please Enter a value").optional(),
  dnPattern: z.string().nonempty("Please Enter a value").optional(),
  loginAttribute: z.string().nonempty("Please Enter a value").optional(),
  adminDN: z.string().nonempty("Please Enter a value").optional(),
  adminPassword: z.string().nonempty("Please Enter a value").optional(),

  name: z.string().nonempty("Please Enter a value").optional(),
  key: z.string().nonempty("Please Enter a value").optional(),
  secret: z.string().nonempty("Please Enter a value").optional(),
  accountingPort: z.string().nonempty("Please Enter a value").optional(),
  url: z.string().nonempty("Please Enter a value").optional(),
});

type FormData = z.infer<typeof schema>;

const options: {
  value: string;
  label: string;
}[] = [
  { value: "same_as_corp", label: "Same as Corp" },
  { value: "ldap", label: "LDAP" },
  { value: "google", label: "Google" },
  { value: "oauth", label: "OAUTH" },
];

export default function AddOrgAccountForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [visibility, setVisibility] = useState("");
  const [authMode, setAuthMode] = useState("same_as_corp");

  const [addAccountLDAP, resultLDAP] = useAddOrgAccountLDAPMutation();
  const [addAccountOAuth, resultOAuth] = useAddOrgAccountOAuthMutation();
  const [addAccountGoogle, resultGoogle] = useAddOrgAccountGoogleMutation();

  const rows = useAppSelector((state) => state.adminOrgAccount.rows);

  const form = useZodForm({
    schema: schema.extend({}),
  });

  const auth = form.watch("authentication");

  useEffect(() => {
    setAuthMode(form.watch("authentication"));
  }, [authMode, form, auth]);

  const onGoogleSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await addAccountGoogle({
        ou: data.ou,
        authentication: authMode,
        clientID: data.clientID,
        emailID: data.emailID,
      }).unwrap();

      dispatch(setRows([...rows, res]));
      dispatch(setCloseModal("addOrgAccountForm"));
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }
  };

  const onOAuthSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await addAccountOAuth({
        ou: data.ou,
        authentication: authMode,
        name: data.name,
        key: data.key,
        secret: data.secret,
        accountingPort: data.accountingPort,
        url: data.url,
      }).unwrap();

      dispatch(setRows([...rows, res]));
      dispatch(setCloseModal("addOrgAccountForm"));
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }
  };

  const onLDAPSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await addAccountLDAP({
        ou: data.ou,
        authentication: authMode,
        ldapHost: data.ldapHost,
        visibility: visibility,
        dnPattern: data.dnPattern,
        loginAttribute: data.loginAttribute,
        adminDN: data.adminDN,
        adminPassword: data.adminPassword,
      }).unwrap();

      dispatch(setRows([...rows, res]));
      dispatch(setCloseModal("addOrgAccountForm"));
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      <Layout>
        <Form
          form={form}
          onSubmit={
            authMode === "google"
              ? onGoogleSubmit
              : authMode === "oauth"
              ? onOAuthSubmit
              : onLDAPSubmit
          }
          className="min-w-full"
        >
          <div className="max-w-md w-full mx-auto bg-white p-4 rounded-lg">
            <h2 className="text-gray-700 text-2xl font-bold mb-4 text-center">
              Add New Organization Unit
            </h2>
            <div className="flex flex-wrap p-2 rounded-lg">
              <div className="px-4 py-2 w-full">
                <div className="relative">
                  <TextInput
                    label="Organization Unit"
                    placeholder="Enter name"
                    {...form.register("ou")}
                  />
                </div>
              </div>

              <div className="px-4 py-2 w-full">
                <div className="relative">
                  <SelectInput
                    options={options}
                    label="Authentication"
                    registerName="authentication"
                    placeholder="Select Authentication"
                  />
                </div>
              </div>

              {authMode === "google" && (
                <>
                  <div className="px-4 py-2 w-full">
                    <div className="relative">
                      <TextInput
                        label="Client ID"
                        placeholder="Enter your client ID"
                        {...form.register("clientID")}
                      />
                    </div>
                  </div>
                  <div className="px-4 py-2 w-full">
                    <div className="relative">
                      <TextInput
                        label="Email ID"
                        placeholder="Enter your email ID"
                        {...form.register("emailID")}
                      />
                    </div>
                  </div>
                </>
              )}

              {authMode === "ldap" && (
                <>
                  <div className="px-4 py-2 w-full">
                    <div className="relative">
                      <TextInput
                        label="Comma Separated LDAP Host"
                        placeholder="Enter host name"
                        {...form.register("ldapHost")}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-2 w-full">
                    <div className="relative">
                      <RadioGroup
                        label="Set Visibility"
                        value={visibility}
                        onChange={setVisibility}
                      >
                        <Radio value="userDn">
                          <span className="mr-2 md:mr-10">User DN</span>
                        </Radio>
                        <Radio value="searchUserDn">Search user DN</Radio>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="px-4 py-2 w-full">
                    <div className="relative">
                      <TextInput
                        label="DN Pattern"
                        placeholder="Enter DN Pattern"
                        {...form.register("dnPattern")}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-2 w-full">
                    <div className="relative">
                      <TextInput
                        label="Login Attribute"
                        placeholder="Enter login attribute"
                        {...form.register("loginAttribute")}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-2 w-full">
                    <div className="relative">
                      <TextInput
                        label="Admin DN"
                        placeholder="Enter admin DN"
                        {...form.register("adminDN")}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-2 w-full">
                    <div className="relative">
                      <TextInput
                        label="Admin Password"
                        placeholder="********"
                        {...form.register("adminPassword")}
                      />
                    </div>
                  </div>
                </>
              )}

              {authMode === "oauth" && (
                <>
                  <div className="px-4 py-2 w-full">
                    <div className="relative">
                      <TextInput
                        label="Name"
                        placeholder="Enter name"
                        {...form.register("name")}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-2 w-full">
                    <div className="relative">
                      <TextInput
                        label="Key"
                        placeholder="Enter key"
                        {...form.register("key")}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-2 w-full">
                    <div className="relative">
                      <TextInput
                        label="Secret"
                        placeholder="Enter secret"
                        {...form.register("secret")}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-2 w-full">
                    <div className="relative">
                      <TextInput
                        label="Accounting Port"
                        placeholder="Enter accounting port"
                        {...form.register("accountingPort")}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-2 w-full">
                    <div className="relative">
                      <TextInput
                        label="URL"
                        placeholder="Enter URL"
                        {...form.register("url")}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="px-6 flex justify-center w-full">
              <Button
                type="button"
                intent={`secondary`}
                className="w-full mr-2 md:mr-6"
                onClick={() => dispatch(setCloseModal("addOrgAccountForm"))}
              >
                <span className="inline-flex justify-center w-full">
                  Cancel
                </span>
              </Button>

              <Button
                intent={`primary`}
                className="w-full"
                isLoading={
                  authMode === "google"
                    ? resultGoogle.isLoading
                    : authMode === "oauth"
                    ? resultOAuth.isLoading
                    : resultLDAP.isLoading
                }
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
