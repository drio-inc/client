import Button from "@ui/Button";
import { FaLock } from "react-icons/fa";
import { TextInput } from "@/comps/ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import Checkbox from "@ui/Forms/Checkbox";
import AuthContainer from "@ui/Containers/AuthContainer";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import { useActivateMutation } from "@/state/services/apiService";

import { setUser } from "@/state/slices/authSlice";

const schema = z
  .object({
    username: z.string().nonempty("Please Enter a value").max(1024),
    email: z
      .string()
      .nonempty("Please Enter a value")
      .email("Please enter a valid email address."),
    password: z.string().nonempty("Please Enter a value"),
    // .regex(/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, {
    //   message:
    //     "Must be at least 8 characters and contain a lowercase letter, uppercase letter, number, and special character.",
    // }),
    confirmPassword: z
      .string()
      .nonempty("Please Enter a value")
      .min(8, "Must be same as password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function Activation() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activate, result] = useActivateMutation();

  const [termsChecked, setTermsChecked] = useState(false);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await activate({
        username: data.username,
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(setUser(res));
      router.push("/activation/auth-mode");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      <Layout>
        <AuthContainer authText="Account activation" maxWidth="xl">
          <Form form={form} onSubmit={onSubmit}>
            <div className="px-4 py-2 w-full">
              <div className="relative">
                <TextInput
                  label="Username"
                  {...form.register("username")}
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full">
              <div className="relative">
                <TextInput
                  type="email"
                  label="Email address"
                  {...form.register("email")}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full">
              <div className="relative">
                <TextInput
                  type="password"
                  label="Password"
                  {...form.register("password")}
                />
              </div>
            </div>

            <div className="px-4 py-2 w-full">
              <div className="relative">
                <TextInput
                  type="password"
                  label="Confirm password"
                  {...form.register("confirmPassword")}
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-2 w-full text-gray-900 mb-2">
              <div className="flex items-center">
                <Checkbox onChange={() => setTermsChecked(!termsChecked)}>
                  <label htmlFor="remember-me" className="text-sm">
                    I agree to the Terms of service and Privacy Policy
                  </label>
                </Checkbox>
              </div>
            </div>

            <div className="px-4 py-2 w-full">
              <Button
                intent={`primary`}
                disabled={!termsChecked}
                className="relative w-full"
                isLoading={result.isLoading}
              >
                <FaLock className="inline-block text-drio-red-dark ml-4 w-4 h-4 absolute left-0" />
                Activate
              </Button>
            </div>
          </Form>
        </AuthContainer>
      </Layout>
    </>
  );
}
