import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/comps/ui/Forms/FormV2";

import Button from "@/comps/ui/Button";
import showAlert from "@/comps/ui/Alert";
import { Input } from "@/comps/ui/Input";
import { Textarea } from "@/comps/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCloseModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setActivationEmailTemplate, setWelcomeEmailTemplate } from "@/state/slices/settingsSlice";

const schema = z.object({
  subject: z.string(),
  body: z.string(),
});

type FormData = z.infer<typeof schema>;

const EmailTemplateForm = () => {
  const dispatch = useAppDispatch();
  const { emailTemplate } = useAppSelector((state) => state.settings);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject:
        emailTemplate.templateType === "activation"
          ? emailTemplate.activationEmailTemplate.subject
          : emailTemplate.welcomeEmailTemplate.subject,
      body:
        emailTemplate.templateType === "activation"
          ? emailTemplate.activationEmailTemplate.body
          : emailTemplate.welcomeEmailTemplate.body,
    },
  });
  const onSubmit = async (data: FormData) => {
    console.log(data);

    if (emailTemplate.templateType === "activation") {
      dispatch(setActivationEmailTemplate(data));
    }

    if (emailTemplate.templateType === "welcome") {
      dispatch(setWelcomeEmailTemplate(data));
    }

    dispatch(setCloseModal("emailTemplateForm"));
    showAlert("Settings updated successfully", "success");
  };

  return (
    <div className={"px-4 flex flex-col shadow-lg rounded-lg bg-white w-[800px]"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-wrap w-full mb-4"
        >
          <div className="py-4 border-b">
            <h2 className="text-gray-700 text-xl font-bold">
              Edit
              {emailTemplate.templateType === "activation" ? " Activation" : " Welcome"} Email
              Template
            </h2>
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Subject</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="Type a subject here." />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Body</FormLabel>

                  <FormControl>
                    <Textarea rows={12} {...field} placeholder="Type a body here." />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center gap-x-4 my-4">
            <Button
              type="button"
              intent={"secondary"}
              className="w-[164px]"
              onClick={() => dispatch(setCloseModal("emailTemplateForm"))}
            >
              Cancel
            </Button>
            <Button intent={"primary"} className="w-[164px]">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmailTemplateForm;
