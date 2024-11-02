import Button from "@ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaLock } from "react-icons/fa";
import { TextInput } from "@ui/Forms/Inputs";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import AuthContainer from "@ui/Containers/AuthContainer";

import Link from "next/link";
import { useState } from "react";

import { HiCheck } from "react-icons/hi";
import * as CheckBox from "@radix-ui/react-checkbox";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import { setUser, setToken } from "@/state/slices/authSlice";
import { useLoginMutation, useLazyOAuthLoginQuery } from "@/api/auth";

const schema = z.object({
  username: z
    .string()
    .nonempty("Please Enter a value")
    .max(1024, "username must be less than 1024 characters"),
  password: z
    .string()
    .nonempty("Please Enter a value")
    .min(8, "Password must be at least 8 characters long")
    .max(256, "Password must be less than 256 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, result] = useLoginMutation();
  const [trigger] = useLazyOAuthLoginQuery();
  const [rememberMe, setRememberMe] = useState(false);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await login({
        username: data.username,
        password: data.password,
      }).unwrap();

      if (res.token) {
        dispatch(setToken(res.token));
        window.localStorage.setItem("token", res.token);

        dispatch(
          setUser({
            username: data.username,
          })
        );

        router.push("/accounts");
      }
    } catch (err: any) {
      showAlert(err?.data?.message ?? "Something went wrong. Please try again.", "error");
    }
  };

  const handleOAuth = async () => {
    // const res = await trigger().unwrap();
    // console.log(res);

    window.location.href = process.env.API_URL + "/oauth/admin-login";

    // if (res.token) {
    //   dispatch(setToken(res.token));
    //   window.localStorage.setItem("token", res.token);

    //   dispatch(
    //     setUser({
    //       username: " ",
    //     })
    //   );

    //   router.push("/accounts");
    // }
  };

  return (
    <Layout>
      <AuthContainer authText="Sign in to your account" maxWidth="xl">
        <Form form={form} onSubmit={onSubmit}>
          <div className="px-4 py-2 w-full">
            <div className="relative">
              <TextInput
                label="Username"
                placeholder="Username"
                {...form.register("username")}
                defaultValue={`saas-admin@drio.ai`}
              />
            </div>
          </div>

          <div className="px-4 py-2 w-full">
            <div className="relative">
              <TextInput type="password" label="Password" {...form.register("password")} />
            </div>
          </div>

          <div className="flex flex-col gap-x-6 md:flex-row items-center justify-between px-4 py-2 w-full text-gray-900 mb-2">
            <div className="flex items-center mb-2 md:mb-0">
              <CheckBox.Root
                className="mr-1 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={rememberMe}
                onCheckedChange={() => setRememberMe(!rememberMe)}
              >
                <CheckBox.Indicator className="text-white">
                  <HiCheck className="w-3 h-3" />
                </CheckBox.Indicator>
              </CheckBox.Root>
              <label className="text-sm">Remember Me</label>
            </div>

            <span className="inline-block text-drio-red text-sm font-medium cursor-pointer">
              <Link href={`/forgot-password`}>Forgot your password?</Link>
            </span>
          </div>

          <div className="px-4 py-2 w-full">
            <Button intent={`primary`} className="w-full relative" isLoading={result.isLoading}>
              <FaLock className="inline-block text-drio-red-dark w-4 h-4 absolute left-4" />
              Sign In
            </Button>
          </div>

          <div className="px-4 flex items-center w-full mb-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="inline-block mx-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="px-4 py-2 w-full">
            <button
              type="button"
              onClick={handleOAuth}
              className="w-full justify-center border border-gray-700 flex items-center py-3"
            >
              <Image src="/microsoft-logo.svg" alt="Google" width={24} height={24} />
              <span className="ml-2">Sign In with Microsoft</span>
            </button>
          </div>
        </Form>
      </AuthContainer>
    </Layout>
  );
}
