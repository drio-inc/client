import Button from "@ui/Button";
import { FaLock } from "react-icons/fa";
import { SelectInput } from "@/comps/ui/Forms/Inputs";

import Layout from "@/comps/Layout";
import AuthContainer from "@ui/Containers/AuthContainer";

import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { z } from "zod";
import { setAuthMode } from "@/state/slices/authSlice";
import { SubmitHandler } from "react-hook-form";

import { Form, useZodForm } from "@ui/Forms/Form";

const schema = z.object({
  authValue: z
    .string({
      required_error: "Please select an option",
      invalid_type_error: "Option must be a string",
    })
    .nonempty("Please Enter a value")
    .nullable(),
});

type FormData = z.infer<typeof schema>;

const options: {
  value: string;
  label: string;
}[] = [
  { value: "ldap", label: "LDAP" },
  { value: "google", label: "Google" },
  { value: "oauth", label: "OAUTH" },
];

export default function AuthMode() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { authMode, user } = useAppSelector((state) => state.auth);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);

    // dispatch(setAuthMode(data.authValue));
    // router.push(`/auth/activation/auth-mode/${data.authValue}`);
  };

  if (!user) {
    router.push("/auth/activation");
  }

  return (
    user && (
      <Layout>
        <Form form={form} onSubmit={onSubmit}>
          <AuthContainer authText="Account activation" maxWidth="xl">
            <div className="px-4 py-2 w-full">
              <div className="relative">
                <SelectInput
                  options={options}
                  label="Select an option"
                  registerName="authValue"
                  placeholder="Enter type"
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full">
              <Button
                intent={`primary`}
                // disabled={!authMode}
                className="w-full relative"
              >
                <FaLock className="inline-block text-drio-red-dark ml-4 w-4 h-4 absolute left-0" />
                <span className="inline-flex justify-center w-full">
                  Set Authentication
                </span>
              </Button>
            </div>
          </AuthContainer>
        </Form>
      </Layout>
    )
  );
}
