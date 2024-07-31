import { z } from "zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

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
import { setNTPServer } from "@/state/slices/settingsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from "@/comps/ui/Select";

const schema = z.object({
  primary_server_address: z.string(),
  secondary_server_address: z.string(),
  sync_interval: z.string().min(1, "Please enter a valid sync interval"),

  backup_servers: z.array(
    z.object({
      server_address: z.string(),
    })
  ),
});

type FormData = z.infer<typeof schema>;

const NTPServerForm = () => {
  const dispatch = useAppDispatch();
  const { ntpServer } = useAppSelector((state) => state.settings);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      sync_interval: ntpServer.sync_interval,
      backup_servers: ntpServer.backup_servers,
      primary_server_address: ntpServer.primary_server_address,
      secondary_server_address: ntpServer.secondary_server_address,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "backup_servers",
    control: form.control,
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);

    dispatch(
      setNTPServer({
        ...data,
        backup_servers: data.backup_servers.map((server, index) => ({
          ...server,
          server_number: index + 1,
        })),
      })
    );
    dispatch(setCloseModal("ntpServerForm"));
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
              name="primary_server_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Primary NTP Server</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="ntp-b.nist.gov" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="secondary_server_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Secondary NTP Server</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="ntp-c.colorado.edu" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="py-2 w-full">
              <FormField
                control={form.control}
                name={`backup_servers.${index}.server_address`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Backup NTP Server {index + 1}</FormLabel>

                    <FormControl>
                      <Input {...field} placeholder="00.00.00.00" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ server_address: "" })}
            className="text-drio-red font-medium ml-auto text-sm transition-colors duration-200 ease-in-out hover:text-drio-red-dark"
          >
            + Add Another Server
          </button>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="sync_interval"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Sync Interval</FormLabel>

                  <div className="flex border rounded-md">
                    <FormControl className="flex-grow">
                      <Input {...field} className="border-none" placeholder="30" />
                    </FormControl>

                    <Select defaultValue="mins" onValueChange={() => console.log("value changed")}>
                      <SelectTrigger className="w-min border-none">
                        <SelectValue placeholder="Select a time range" />
                      </SelectTrigger>

                      <SelectContent className="z-[1003]">
                        <SelectItem value="mins">mins</SelectItem>
                        <SelectItem value="hours">hours</SelectItem>
                        <SelectItem value="days">days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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
              onClick={() => dispatch(setCloseModal("ntpServerForm"))}
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

export default NTPServerForm;
