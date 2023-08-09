import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { useRouter } from "next/router";
import AuthContainer from "@ui/Containers/AuthContainer";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import {
  setUser,
  setAuthMode,
  setAuthenticated,
} from "@/state/slices/authSlice";

import { useSetLDAPMutation } from "@/api/auth";

const schema = z.object({
  authValue: z.string().nonempty("Please Enter a value").optional(),
  hostAddress: z.string().nonempty("Please Enter a value"),
  dnPattern: z.string().nonempty("Please Enter a value").optional(),
  firstName: z.string().nonempty("Please Enter a value"),
  lastName: z.string().nonempty("Please Enter a value"),
  groupObjectClass: z.string().nonempty("Please Enter a value"),
  groupBaseDN: z.string().nonempty("Please Enter a value"),
  groupMembershipAttribute: z
    .string()
    .nonempty("Please Enter a value")
    .optional(),
  userAttribute: z.string().nonempty("Please Enter a value").optional(),
  groupIDttribute: z.string().nonempty("Please Enter a value").optional(),
});

type FormData = z.infer<typeof schema>;

const authOptions = [
  { value: "ldap", label: "LDAP" },
  { value: "google", label: "Google" },
  { value: "oauth", label: "OAUTH" },
];

export default function LdapAuth() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [setLDAP, result] = useSetLDAPMutation();
  const [visibility, setVisibility] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const { authMode } = useAppSelector((state) => state.auth);

  const form = useZodForm({
    schema: schema,
  });

  const redirect = () => {
    dispatch(setAuthMode(form.getValues("authValue")));
    router.push(`/activation/auth-mode/${form.getValues("authValue")}`);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await setLDAP({
        ...data,
      }).unwrap();

      dispatch(setUser(res));
      dispatch(setAuthenticated(true));

      router.push("/dashboard");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  return (
    <>
      <Layout>
        <Form form={form} onSubmit={onSubmit} className="min-w-full">
          <AuthContainer authText="Authentication and Authorization">
            <div className="px-4 py-2 w-full md:w-1/2">
              <div className="relative">
                <SelectInput
                  className="w-full"
                  onChangeCustomAction={redirect}
                  options={authOptions}
                  registerName="authValue"
                  label="Select Authentication Mode"
                  placeholder={
                    authOptions.find((o) => o.value === authMode)?.label
                  }
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full md:w-1/2">
              <div className="relative">
                <TextInput
                  label="LDAP Hosts"
                  {...form.register("hostAddress")}
                  placeholder="Enter host address"
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full">
              <RadioGroup.Root
                value={visibility}
                className="flex gap-2.5"
                aria-label="Set Visibility"
                onValueChange={setVisibility}
              >
                <div className="flex items-center">
                  <RadioGroup.Item
                    id="r1"
                    value="userDn"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    htmlFor="r1"
                    className="text-gray-500 text-sm font-medium mr-2 md:mr-10 pl-2"
                  >
                    User DN
                  </label>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item
                    id="r2"
                    value="searchUserDn"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    className="text-gray-500 text-sm font-medium mr-2 md:mr-10 pl-2"
                    htmlFor="r2"
                  >
                    Search user DN
                  </label>
                </div>
              </RadioGroup.Root>
            </div>

            <div className="px-4 py-2 w-full md:w-1/2">
              <div className="relative">
                <button
                  onClick={() => console.log("validate")}
                  className="cursor-pointer block text-sm underline text-gray-500 absolute top-0 right-0"
                >
                  Validate
                </button>
                <SelectInput
                  hasPlusIndicator
                  label="DN Pattern"
                  registerName="dnPattern"
                  placeholder="DN Pattern"
                  className="w-full relative"
                  options={[
                    { value: "LDAP", label: "LDAP" },
                    { value: "Google", label: "Google" },
                    { value: "OAuth", label: "OAUTH" },
                  ]}
                />
              </div>
            </div>

            <div className="w-full px-4 py-2">
              <h2 className="font-semibold tex-lg">Advanced Configuaration</h2>
            </div>

            <div className="px-4 py-2 w-full md:w-1/2">
              <div className="relative">
                <TextInput
                  label="First Name Attribute"
                  placeholder="Enter first name"
                  {...form.register("firstName")}
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full md:w-1/2">
              <div className="relative">
                <TextInput
                  label="Last Name Attribute"
                  placeholder="Enter last name"
                  {...form.register("lastName")}
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full md:w-1/2">
              <div className="relative">
                <SelectInput
                  registerName="groupObjectClass"
                  placeholder="Object Class"
                  label="Group Object Class"
                  className="w-full relative"
                  options={[
                    { value: "LDAP", label: "LDAP" },
                    { value: "Google", label: "Google" },
                    { value: "OAuth", label: "OAUTH" },
                  ]}
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full md:w-1/2">
              <div className="relative">
                <SelectInput
                  registerName="groupBaseDN"
                  label="Group Base DN"
                  placeholder="Base DN"
                  className="w-full relative"
                  options={[
                    { value: "LDAP", label: "LDAP" },
                    { value: "Google", label: "Google" },
                    { value: "OAuth", label: "OAUTH" },
                  ]}
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full">
              <RadioGroup.Root
                value={membershipType}
                className="flex gap-2.5"
                onValueChange={setMembershipType}
                aria-label="Group Membership of User"
              >
                <div className="flex items-center">
                  <RadioGroup.Item
                    id="r1"
                    value="userEntry"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    htmlFor="r1"
                    className="text-gray-500 text-sm font-medium mr-2 md:mr-10 pl-2"
                  >
                    User Entry
                  </label>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item
                    id="r2"
                    value="groupEntry"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    className="text-gray-500 text-sm font-medium mr-2 md:mr-10 pl-2"
                    htmlFor="r2"
                  >
                    Group Entry
                  </label>
                </div>
                <div className="flex items-center">
                  <RadioGroup.Item
                    id="r3"
                    value="bothEntry"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    className="text-gray-500 text-sm font-medium mr-2 md:mr-10 pl-2"
                    htmlFor="r3"
                  >
                    Both
                  </label>
                </div>
              </RadioGroup.Root>
            </div>

            {membershipType === "bothEntry" && (
              <div className="px-4 py-2 w-full md:w-1/2">
                <div className="relative">
                  <SelectInput
                    registerName="groupIDAttribute"
                    label="Group ID Attribute"
                    placeholder="Enter your first naame"
                    className="w-full relative"
                    options={[
                      { value: "LDAP", label: "LDAP" },
                      { value: "Google", label: "Google" },
                      { value: "OAuth", label: "OAUTH" },
                    ]}
                  />
                </div>
              </div>
            )}

            {membershipType !== "" && (
              <div className="px-4 py-2 w-full md:w-1/2">
                <div className="relative">
                  <SelectInput
                    registerName="groupMembershipAttribute"
                    label="Group Membership Attribute"
                    placeholder="Select Group Membership Attribute"
                    className="w-full relative"
                    options={[
                      { value: "LDAP", label: "LDAP" },
                      { value: "Google", label: "Google" },
                      { value: "OAuth", label: "OAUTH" },
                    ]}
                  />
                </div>
              </div>
            )}

            {membershipType === "groupEntry" && (
              <div className="px-4 py-2 w-full md:w-1/2">
                <div className="relative">
                  <SelectInput
                    registerName="userAttribute"
                    label="User Attribute Held in Group Member Attribute"
                    placeholder="Select Group Membership Attribute"
                    className="w-full relative"
                    options={[
                      { value: "LDAP", label: "LDAP" },
                      { value: "Google", label: "Google" },
                      { value: "OAuth", label: "OAUTH" },
                    ]}
                  />
                </div>
              </div>
            )}

            <div className="px-4 py-2 flex justify-center md:justify-end w-full">
              <Button
                type="button"
                intent={`secondary`}
                onClick={() => router.push(`/auth/activation/auth-mode`)}
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
                <span className="inline-flex justify-center w-full">Save</span>
              </Button>
            </div>
          </AuthContainer>
        </Form>
      </Layout>
    </>
  );
}
