"use client";
import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { v4 as uuiv4 } from "uuid";
import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/triggerActionSlice";
import PrismLoader from "@/comps/ui/PrismLoader/PrismLoader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/comps/ui/Accordion";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/comps/ui/Forms/FormV2";

import { Input } from "@/comps/ui/Input";
import { Textarea } from "@/comps/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/comps/ui/Select";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  channel_type: z.string({
    required_error: "Please select an option",
  }),

  url: z.string().nonempty("Please Enter a value"),

  authentication_type: z.string({
    required_error: "Please select an option",
  }),

  request_method: z.string({
    required_error: "Please select an option",
  }),

  token: z.string().optional(),
  secret: z.string().optional(),
  api_key: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  json_payload: z.string().optional(),

  query_params: z.array(
    z.object({
      key: z.string().nonempty("Please Enter a value"),
      value: z.string().nonempty("Please Enter a value"),
    })
  ),
});

type FormData = z.infer<typeof schema>;

export default function AddTriggerChannelForm() {
  const dispatch = useAppDispatch();
  const { rows } = useAppSelector((state) => state.triggerAction);

  const [jsonValue, setJsonValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [jsonError, setJsonError] = useState(false);

  const jsonRef = useRef<HTMLPreElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      request_method: "post",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "query_params",
  });

  useEffect(() => {
    if (jsonRef.current) {
      console.log(jsonRef.current);
    }
  }, [jsonRef.current?.textContent]);

  const webhookOptions = [
    {
      label: "Webhook",
      value: "webhook",
    },
    {
      label: "Slack",
      value: "slack",
    },
    {
      label: "Email",
      value: "email",
    },
    {
      label: "SMS",
      value: "sms",
    },
    {
      label: "Telegram",
      value: "telegram",
    },
    {
      label: "Microsoft Teams",
      value: "microsoft_teams",
    },
    {
      label: "Discord",
      value: "discord",
    },
    {
      label: "Google Chat",
      value: "google_chat",
    },
    {
      label: "Twilio",
      value: "twilio",
    },
  ];

  const onSubmit = async (data: FormData) => {
    try {
      dispatch(
        setRows([
          ...rows,
          {
            ...data,
            id: rows.length + 1,
            times_used: 0,
            enabled: "No",
          },
        ])
      );
      showAlert("Trigger channel added successfully", "success");
    } catch (err: any) {
      showAlert(err?.data?.message ?? "Something went wrong. Please try again.", "error");
    }
    7;

    form.reset();
    dispatch(setCloseModal("addTriggerActionForm"));
  };

  return (
    <Layout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto bg-white py-8 px-6 rounded-lg w-[400px]"
        >
          <h2 className="text-gray-700 text-2xl font-bold text-center">Add Trigger Action</h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <div className="py-2 w-full">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Name</FormLabel>

                    <FormControl>
                      <Input {...field} placeholder="Enter trigger name" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-2 w-full">
              <FormField
                name="channel_type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Channel Type</FormLabel>

                    <FormControl>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select trigger channel type" />
                        </SelectTrigger>

                        <SelectContent className="z-[1003]">
                          {webhookOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-2 w-full">
              <FormField
                name="url"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">URL</FormLabel>

                    <FormControl>
                      <Input {...field} placeholder="Enter trigger URL" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-2 w-full">
              <FormField
                name="request_method"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Request Method</FormLabel>

                    <FormControl>
                      <Select defaultValue={"post"} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select request method" />
                        </SelectTrigger>

                        <SelectContent className="z-[1003]">
                          <SelectItem value="get">GET</SelectItem>
                          <SelectItem value="post">POST</SelectItem>
                          <SelectItem value="put">PUT</SelectItem>
                          <SelectItem value="delete">DELETE</SelectItem>
                          <SelectItem value="patch">PATCH</SelectItem>
                          <SelectItem value="head">HEAD</SelectItem>
                          <SelectItem value="options">OPTIONS</SelectItem>
                          <SelectItem value="trace">TRACE</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-2 w-full">
              <FormField
                name="authentication_type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Authentication Type</FormLabel>

                    <FormControl>
                      <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select authentication type" />
                        </SelectTrigger>

                        <SelectContent className="z-[1003]">
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="token">Token</SelectItem>
                          <SelectItem value="secret">Secret</SelectItem>
                          <SelectItem value="api_key">API Key</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.watch("authentication_type") === "token" && (
              <div className="py-2 w-full">
                <FormField
                  name="token"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Token</FormLabel>

                      <FormControl>
                        <Input {...field} placeholder="Enter token" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {form.watch("authentication_type") === "secret" && (
              <div className="py-2 w-full">
                <FormField
                  name="secret"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Secret</FormLabel>

                      <FormControl>
                        <Input {...field} placeholder="Enter secret" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {form.watch("authentication_type") === "api_key" && (
              <div className="py-2 w-full">
                <FormField
                  name="api_key"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">API Key</FormLabel>

                      <FormControl>
                        <Input {...field} placeholder="Enter API Key" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {form.watch("authentication_type") === "basic" && (
              <>
                <div className="py-2 w-full">
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Username</FormLabel>

                        <FormControl>
                          <Input {...field} placeholder="Enter username" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Password</FormLabel>

                        <FormControl>
                          <Input {...field} placeholder="Enter password" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            <Accordion type="single" collapsible className="w-full -mx-2">
              {fields.map((field, index) => (
                <div key={field.id} className="py-2 w-full">
                  <AccordionItem value={field.id}>
                    <AccordionTrigger>
                      <span className="text-gray-700">Query Param {index + 1}</span>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="py-2 w-full">
                        <FormField
                          name={`query_params.${index}.key`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Key</FormLabel>

                              <FormControl>
                                <Input {...field} placeholder="Enter key" />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="py-2 w-full">
                        <FormField
                          name={`query_params.${index}.value`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Value</FormLabel>

                              <FormControl>
                                <Input {...field} placeholder="Enter value" />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-drio-red text-sm font-medium ml-auto "
                      >
                        Remove
                      </button>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>

            <button
              type="button"
              onClick={() => append({ key: "", value: "" })}
              className="text-drio-red text-sm font-medium ml-auto "
            >
              + Add Query Param
            </button>

            <div className="py-2 w-full">
              <FormField
                name="json_payload"
                control={form.control}
                render={({ field }) => {
                  const handleTextareaChange = (e: any) => {
                    setJsonValue(e.currentTarget.textContent);

                    try {
                      const parsed = JSON.parse(e.currentTarget.textContent);
                      field.onChange(JSON.stringify(parsed, null, 2));
                      setIsEditing(true);
                      setJsonError(false);
                    } catch (error) {
                      setJsonError(true);
                      showAlert("Invalid JSON", "error");
                    }
                  };

                  return (
                    <FormItem>
                      <FormLabel className="text-gray-700">JSON Payload</FormLabel>

                      <FormControl>
                        <div className=" rounded">
                          {isEditing ? (
                            <DynamicReactJson
                              name={false}
                              theme="monokai"
                              src={jsonValue ? JSON.parse(jsonValue) : {}}
                              style={{ fontSize: "14px", borderRadius: "4px", padding: "8px" }}
                              onAdd={(add) => field.onChange(JSON.stringify(add.updated_src))}
                              onEdit={(edit) => field.onChange(JSON.stringify(edit.updated_src))}
                              onDelete={(del) => field.onChange(JSON.stringify(del.updated_src))}
                            />
                          ) : (
                            <>
                              <pre className="language-js h-[300px] !whitespace-pre-wrap">
                                <code
                                  ref={jsonRef}
                                  contentEditable
                                  spellCheck={false}
                                  suppressContentEditableWarning
                                  onInput={(e) => handleTextareaChange(e)}
                                  className="language-js outline-none bg-transparent !whitespace-pre-wrap"
                                >
                                  {jsonValue
                                    ? JSON.stringify(JSON.parse(jsonValue), null, 2)
                                    : "Paste JSON here"}
                                </code>
                              </pre>
                              <PrismLoader />
                            </>
                          )}

                          <button
                            type="button"
                            disabled={jsonError}
                            onClick={() => setIsEditing(!isEditing)}
                            className="mt-2 text-drio-red font-medium text-sm disabled:opacity-40 inline-flex justify-end w-full"
                          >
                            {!isEditing ? "View Formatted JSON" : "Edit Raw JSON"}
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>

          <div className="py-2 px-2 flex w-full mt-4 gap-4">
            <Button
              type="button"
              className="w-full"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("addTriggerActionForm"))}
            >
              <span className="inline-flex justify-center">Cancel</span>
            </Button>

            <Button intent={`primary`} className="w-full">
              <span className="inline-flex justify-center">Add Action</span>
            </Button>
          </div>
        </form>
      </Form>
    </Layout>
  );
}
