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
import { zodResolver } from "@hookform/resolvers/zod";
import { setCloseModal } from "@/state/slices/uiSlice";
import { setEmailServer } from "@/state/slices/settingsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const schema = z.object({
  server_address: z.string(),
  server_email_address: z.string().email(),

  server_username: z.string(),
  server_password: z.string(),
  server_email_name: z.string(),
  server_port: z.string().min(1, "Please enter a valid port number"),
});

type FormData = z.infer<typeof schema>;

const EmailServerForm = () => {
  const dispatch = useAppDispatch();
  const { emailServer } = useAppSelector((state) => state.settings);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      server_port: emailServer.server_port,
      server_address: emailServer.server_address,
      server_username: emailServer.server_username,
      server_password: emailServer.server_password,
      server_email_name: emailServer.server_email_name,
      server_email_address: emailServer.server_email_address,
    },
  });

  const onSubmit = async (data: FormData) => {
    dispatch(setEmailServer(data));
    dispatch(setCloseModal("emailServerForm"));
    showAlert("Settings updated successfully", "success");
  };

  return (
    <div className={"px-4 flex flex-col w-full shadow-lg rounded-lg bg-white"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-wrap w-full mb-4"
        >
          <div className="py-4 px-8 border-b">
            <h2 className="text-gray-700 text-xl font-bold">Edit Email Server Configuration</h2>
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="server_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Server Address</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="10.23.42.34" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="server_port"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Server Port</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="8080" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="server_username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Server Username</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="john_doe" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="server_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Server Password</FormLabel>

                  <FormControl>
                    <Input {...field} type="password" placeholder="**********" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="server_email_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Server Email Address</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="aida@gmail.com" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="server_email_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Server Email Name</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="A 10Harmony" />
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
              onClick={() => dispatch(setCloseModal("emailServerForm"))}
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

export default EmailServerForm;
