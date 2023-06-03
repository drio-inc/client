import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import { useRouter } from "next/router";

import { z } from "zod";
import Layout from "@/comps/Layout";
import { SubmitHandler } from "react-hook-form";
import { Form, useZodForm } from "@ui/Forms/Form";
import AuthContainer from "@ui/Containers/AuthContainer";

import {
  setAuthMode,
  setUser,
  setAuthenticated,
} from "@/state/slices/authSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { useSetOAuthMutation } from "@/state/services/apiService";
import showAlert from "@ui/Alert";

const schema = z.object({
  authValue: z.string().nonempty("Please Enter a value").nullable().optional(),
  clientId: z.string().nonempty("Please Enter a value"),
  clientSecret: z.string().nonempty("Please Enter a value"),
  userInfoURL: z.string().nonempty("Please Enter a value"),
  redirectURL: z.string().nonempty("Please Enter a value"),
});

type FormData = z.infer<typeof schema>;

const options = [
  { value: "ldap", label: "LDAP" },
  { value: "google", label: "Google" },
  { value: "oauth", label: "OAUTH" },
];

export default function OAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [setGoogleAuth, result] = useSetOAuthMutation();
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
      const res = await setGoogleAuth({
        clientId: data.clientId,
        clientSecret: data.clientSecret,
        userInfoURL: data.userInfoURL,
        redirectURL: data.redirectURL,
      }).unwrap();

      console.log(res);

      dispatch(setUser(res));
      dispatch(setAuthenticated(true));

      router.push("/dashboard");
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
          <AuthContainer authText="Select Authentication Mode">
            <div className="px-4 py-2 w-full">
              <div className="relative">
                <SelectInput
                  options={options}
                  className="w-full"
                  onChangeCustomAction={redirect}
                  registerName="authValue"
                  label="Select Authentication Mode"
                  placeholder={options.find((o) => o.value === authMode)?.label}
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full md:w-1/2">
              <div className="relative">
                <TextInput
                  label="Client ID"
                  type="password"
                  {...form.register("clientId")}
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full md:w-1/2">
              <div className="relative">
                <TextInput
                  label="Client Secret"
                  type="password"
                  {...form.register("clientSecret")}
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full md:w-1/2">
              <div className="relative">
                <TextInput
                  label="User Information URL"
                  type="text"
                  placeholder="Accounting Port"
                  {...form.register("userInfoURL")}
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full md:w-1/2">
              <div className="relative">
                <TextInput
                  type="text"
                  placeholder="url"
                  label="Redirect URL"
                  {...form.register("redirectURL")}
                />
              </div>
            </div>

            <div className="px-4 py-2 flex justify-center md:justify-end w-full">
              <Button
                type="button"
                intent={`secondary`}
                className="w-full md:w-auto mr-2"
                onClick={() => router.push(`/auth/activation/auth-mode`)}
              >
                <span className="inline-flex justify-center w-full">
                  Cancel
                </span>
              </Button>

              <Button
                intent={`primary`}
                isLoading={result.isLoading}
                className="w-full md:w-auto"
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
