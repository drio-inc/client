import { z } from "zod";
import Button from "@ui/Button";
import { TextInput } from "@/comps/ui/Forms/Inputs";
import AuthContainer from "@ui/Containers/AuthContainer";
import { useZodForm, Form } from "@/comps/ui/Forms/Form";
import { SubmitHandler } from "react-hook-form";

import { useResetPasswordMutation } from "@/state/services/apiService";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import { useRouter } from "next/router";
import showAlert from "@/comps/ui/Alert";

const schema = z.object({
  email: z
    .string()
    .nonempty("Please Enter a value")
    .email("Please enter a valid email address."),
});

type FormData = z.infer<typeof schema>;

const ForgotPassword = () => {
  const form = useZodForm({
    schema: schema,
  });

  const router = useRouter();
  const [resetPassword, result] = useResetPasswordMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await resetPassword({
        email: data.email,
      }).unwrap();

      console.log(res);

      // router.push("/dashboard");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <AuthContainer
        maxWidth="xl"
        authText="Forgot your password?"
        authSubText="Please, input email address you have registered with"
      >
        <div className="px-4 py-2 w-full">
          <div className="relative">
            <TextInput
              label="Email address"
              placeholder="you@example.com"
              {...form.register("email")}
            />
          </div>
        </div>
        <div className="px-4 py-2 w-full">
          <Button
            intent={`primary`}
            className="w-full relative"
            isLoading={result.isLoading}
          >
            Reset password
          </Button>
        </div>

        {result.isSuccess && (
          <span className="px-4 py-2 w-full text-green-500">
            Link sent successfully
          </span>
        )}
      </AuthContainer>
    </Form>
  );
};

export default ForgotPassword;
