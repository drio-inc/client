import Button from "@ui/Button";
import { useRouter } from "next/router";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TextInput } from "@ui/Forms/Inputs";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import AuthContainer from "@ui/Containers/AuthContainer";

import Link from "next/link";
import { useState } from "react";
import Checkbox from "@ui/Forms/Checkbox";

import { useAppDispatch } from "@/hooks/useStoreTypes";
import { useLoginMutation } from "@/state/services/apiService";
import { setUser, setAuthenticated } from "@/state/slices/authSlice";
import axios from "axios";

// const schema = z.object({
//   email: z
//     .string()
//     .nonempty("Please Enter a value")
//     .min(3, "Email must be at least 3 characters long")
//     .max(255, "Email must be less than 255 characters long")
//     .email("Please enter a valid email address."),
//   password: z
//     .string()
//     .nonempty("Please Enter a value")
//     .min(8, "Password must be at least 8 characters long"),
// });

const schema = z.object({
  userID: z
    .string()
    .nonempty("Please Enter a value")
    .min(1, "userID must be at least 1 characters long")
    .max(1024, "userID must be less than 1024 characters long"),
  password: z
    .string()
    .nonempty("Please Enter a value")
    .min(8, "Password must be at least 8 characters long")
    .max(256, "Password must be less than 256 characters long"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, result] = useLoginMutation();

  const [rememberMe, setRememberMe] = useState(false);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // const res = await login({
      //   email: data.email,
      //   password: data.password,
      // }).unwrap();

      const res = await login({
        email: data.userID,
        password: data.password,
      }).unwrap();

      dispatch(setUser(res));
      dispatch(setAuthenticated(true));

      router.push("/accounts");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };
  return (
    <Layout>
      <AuthContainer authText="Sign in to your account" maxWidth="xl">
        <Form form={form} onSubmit={onSubmit}>
          {/* <div className="px-4 py-2 w-full">
              <div className="relative">
                <TextInput
                  label="Email address / username"
                  {...form.register("email")}
                  placeholder="Email"
                  type="email"
                />
              </div>
            </div> */}

          <div className="px-4 py-2 w-full">
            <div className="relative">
              <TextInput
                label="Username"
                placeholder="Username"
                {...form.register("userID")}
              />
            </div>
          </div>

          <div className="px-4 py-2 w-full">
            <div className="relative">
              <TextInput
                label="Password"
                type="password"
                {...form.register("password")}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2 w-full text-gray-900 mb-2">
            <div className="flex items-center mb-2 md:mb-0">
              <Checkbox onChange={() => setRememberMe(!rememberMe)}>
                <label htmlFor="remember-me" className="text-sm">
                  Remember me
                </label>
              </Checkbox>
            </div>

            <span className="inline-block text-drio-red text-sm font-medium cursor-pointer">
              <Link href={`/auth/forgot-password`}>Forgot your password?</Link>
            </span>
          </div>

          <div className="px-4 py-2 w-full">
            <Button
              intent={`primary`}
              className="w-full relative"
              isLoading={result.isLoading}
            >
              <FaLock className="inline-block text-drio-red-dark w-4 h-4 absolute left-4" />
              Sign In
            </Button>
          </div>

          <div className="px-4 py-2 w-full text-center">
            <p className="text-gray-600 text-sm my-3">
              Don’t have an account?
              <span className="text-drio-red font-medium cursor-pointer">
                <Link href={`/auth/activation`}> Sign Up</Link>
              </span>
            </p>
          </div>

          <div className="px-4 flex items-center w-full mb-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="inline-block mx-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="px-4 py-2 w-full">
            <Button intent={`google`} className="w-full justify-center">
              <FcGoogle className="inline-block w-6 h-6" />
              <span className="ml-2">Sign In with Google</span>
            </Button>
          </div>
        </Form>
      </AuthContainer>
    </Layout>
  );
}
