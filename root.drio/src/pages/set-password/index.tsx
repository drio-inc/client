import Button from "@ui/Button";
import { useRouter } from "next/router";
import { FaLock } from "react-icons/fa";
import { TextInput } from "@ui/Forms/Inputs";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import AuthContainer from "@ui/Containers/AuthContainer";

import { useAppDispatch } from "@/hooks/useStoreTypes";
import { useSetPasswordMutation } from "@/state/services/apiService";
import { setUser, setAuthenticated } from "@/state/slices/authSlice";

const schema = z
  .object({
    password: z.string().nonempty("Please Enter a value"),
    confirmPassword: z.string().nonempty("Please Enter a value"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [setPassword, result] = useSetPasswordMutation();

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await setPassword({
        password: data.password,
      }).unwrap();

      dispatch(setUser(res));
      dispatch(setAuthenticated(true));
      router.push("/my-org/org-units");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };
  return (
    <Layout>
      <AuthContainer authText="First time login" maxWidth="xl">
        <Form form={form} onSubmit={onSubmit}>
          <div className="px-4 py-2 w-full">
            <TextInput
              type="password"
              label="Password"
              {...form.register("password")}
              placeholder="Enter your password"
            />
          </div>

          <div className="px-4 py-2 w-full">
            <TextInput
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              {...form.register("confirmPassword")}
            />
          </div>

          <div className="px-4 py-2 w-full">
            <Button
              intent={`primary`}
              className="w-full relative"
              isLoading={result.isLoading}
            >
              <FaLock className="inline-block text-drio-red-dark w-4 h-4 absolute left-4" />
              <span className="inline-block">Set Password</span>
            </Button>
          </div>
        </Form>
      </AuthContainer>
    </Layout>
  );
}
