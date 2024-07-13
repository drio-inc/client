import { z } from "zod";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Button from "@/comps/ui/Button";
import showAlert from "@/comps/ui/Alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/comps/ui/Forms/FormV2";
import { useState } from "react";
import { Input } from "@/comps/ui/Input";
import { HiChevronRight } from "react-icons/hi";
import { setCloseModal } from "@/state/slices/uiSlice";
import { RadioGroup, RadioGroupItem } from "@/comps/ui/RadioGroup";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@comps/ui/Select";

const baseSchema = z.object({
  authentication_type: z.string({
    required_error: "Please select an authentication type", //LDAP, OAuth, Google
  }),
});

const ldapSchema = z.object({
  //LDAP Schema
  host_address: z.string().min(4, "Please enter a valid host address"),

  dn: z.enum(["user_dn", "search_user_dn"], {
    required_error: "You need to select a DN.",
  }),

  dn_pattern: z.string().min(1, "Please enter a valid dn pattern"),

  first_name_attribute: z.string().min(1, "Please enter a valid first name attribute"),
  last_name_attribute: z.string().min(1, "Please enter a valid last name attribute"),

  group_object_classes: z.string({
    required_error: "Please enter a group object class",
  }),

  group_base_dn: z.string({
    required_error: "Please enter a group base DN",
  }),

  group_membership_attribute: z.enum(["user_entry", "group_entry", "both"], {
    required_error: "You need to select an attribute.",
  }),
});

const oauthSchema = z.object({
  //OAuth Schema
  oauth_key: z.string().optional(),
  oauth_url: z.string().optional(),
  oauth_name: z.string().optional(),
  oauth_secret: z.string().optional(),
  accounting_port: z.string().optional(),
});

const googleSchema = z.object({
  google_client_id: z.string().min(1, "Please enter a valid Google Client ID"),
  google_client_email: z.string().email("Please enter a valid Google Client Email"),
});

type BaseFormSchema = z.infer<typeof baseSchema>;
type LDAPSchema = z.infer<typeof ldapSchema>;
type OAuthSchema = z.infer<typeof oauthSchema>;

const AuthConfig = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const baseForm = useForm<BaseFormSchema>({
    resolver: zodResolver(baseSchema),
  });

  const ldapForm = useForm<LDAPSchema>({
    resolver: zodResolver(ldapSchema),
  });

  const oauthForm = useForm<OAuthSchema>({
    resolver: zodResolver(oauthSchema),
  });

  const authenticationType = baseForm.watch("authentication_type");

  const onSubmit = async (data: BaseFormSchema) => {
    showAlert("Model updated successfully", "success");
  };

  const onOAuthSubmit = async (data: OAuthSchema) => {
    console.log(data);
    showAlert("Model updated successfully", "success");
  };

  const onLDAPSubmit = async (data: LDAPSchema) => {
    console.log({ ...data, authentication_type: baseForm.getValues("authentication_type") });
    showAlert("Model updated successfully", "success");
  };

  return (
    <div className="w-[400px]">
      <div className={"px-6 flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <Form {...baseForm}>
          <form
            onSubmit={baseForm.handleSubmit(onSubmit)}
            className="flex flex-col flex-wrap w-full mb-4"
          >
            <div className="py-4 border-b">
              <h2 className="text-gray-700 text-xl font-bold text-center">
                Authentication & Authorization
              </h2>
            </div>

            <div className="py-2 w-full">
              <FormField
                control={baseForm.control}
                name="authentication_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Authentication Type</FormLabel>

                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select authentication type" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="z-[1003]">
                        <SelectItem value="ldap">LDAP</SelectItem>
                        <SelectItem value="oauth">OAuth</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        {authenticationType === "ldap" && (
          <Form {...ldapForm}>
            <form
              onSubmit={ldapForm.handleSubmit(onLDAPSubmit)}
              className="flex flex-col flex-wrap w-full mb-4"
            >
              <>
                <div className="py-2 w-full">
                  <FormField
                    control={ldapForm.control}
                    name="host_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Host Address</FormLabel>

                        <FormControl className="flex-grow">
                          <Input {...field} placeholder="Enter host address" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={ldapForm.control}
                    name="dn"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-700">DN</FormLabel>
                        <FormControl>
                          <RadioGroup
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            className="flex space-y-1 space-x-8"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="user_dn" />
                              </FormControl>
                              <FormLabel className="font-normal">User DN</FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="search_user_dn" />
                              </FormControl>
                              <FormLabel className="font-normal">Search User DN</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-wrap justify-around items-center">
                  <div className="py-2 w-full">
                    <FormField
                      control={ldapForm.control}
                      name="dn_pattern"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">DN Pattern</FormLabel>

                          <FormControl className="flex-grow">
                            <Input {...field} placeholder="Set DN pattern" />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button
                      type="button"
                      className="flex items-center gap-x-1 text-drio-red mt-2 px-1"
                    >
                      <span className="text-sm font-medium underline">Validate DN Pattern</span>
                      <HiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="py-4 border-b">
                  <h2 className="text-gray-700 text-xl font-bold">Advanced Configuaration</h2>
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={ldapForm.control}
                    name="first_name_attribute"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">First Name Attribute</FormLabel>

                        <FormControl>
                          <Input {...field} placeholder="Enter first name" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={ldapForm.control}
                    name="last_name_attribute"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Last Name Attribute</FormLabel>

                        <FormControl>
                          <Input {...field} placeholder="Enter last name" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={ldapForm.control}
                    name="group_object_classes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Group Object Classes</FormLabel>

                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Object Type" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent className="z-[1003]">
                            <SelectItem value="mins">0 change for 100 samples</SelectItem>
                            <SelectItem value="hours">
                              0 change for 100 samples in 2 hours
                            </SelectItem>
                            <SelectItem value="days">0 change for 100 samples in 2 days</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={ldapForm.control}
                    name="group_base_dn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Group Base DN</FormLabel>

                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Group Base DN" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent className="z-[1003]">
                            <SelectItem value="mins">0 change for 100 samples</SelectItem>
                            <SelectItem value="hours">
                              0 change for 100 samples in 2 hours
                            </SelectItem>
                            <SelectItem value="days">0 change for 100 samples in 2 days</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={ldapForm.control}
                    name="group_membership_attribute"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-700">Group Membership Attribute</FormLabel>
                        <FormControl>
                          <RadioGroup
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            className="flex space-y-1 space-x-8"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="user_entry" />
                              </FormControl>
                              <FormLabel className="font-normal">User Entry</FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="group_entry" />
                              </FormControl>
                              <FormLabel className="font-normal">Group Entry</FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="both" />
                              </FormControl>
                              <FormLabel className="font-normal">Both</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>

              <div className="flex my-4">
                <Button
                  type="button"
                  intent={`secondary`}
                  className="w-full mr-2 md:mr-6"
                  onClick={() => dispatch(setCloseModal("authConfigForm"))}
                >
                  <span className="inline-flex justify-center w-full">Cancel</span>
                </Button>

                <Button intent={"primary"} className="w-full">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}

        {authenticationType === "oauth" && (
          <Form {...oauthForm}>
            <form
              onSubmit={oauthForm.handleSubmit(onOAuthSubmit)}
              className="flex flex-col flex-wrap w-full mb-4"
            >
              <div className="py-2 w-full">
                <FormField
                  control={oauthForm.control}
                  name="oauth_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Name</FormLabel>

                      <FormControl className="flex-grow">
                        <Input {...field} placeholder="Enter name" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2 w-full">
                <FormField
                  control={oauthForm.control}
                  name="oauth_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Key</FormLabel>

                      <FormControl className="flex-grow">
                        <Input {...field} placeholder="Enter key" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2 w-full">
                <FormField
                  control={oauthForm.control}
                  name="oauth_secret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Secret</FormLabel>

                      <FormControl className="flex-grow">
                        <Input {...field} placeholder="Enter secret" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2 w-full">
                <FormField
                  control={oauthForm.control}
                  name="accounting_port"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Accounting Port</FormLabel>

                      <FormControl className="flex-grow">
                        <Input {...field} placeholder="Enter accounting port" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2 w-full">
                <FormField
                  control={oauthForm.control}
                  name="oauth_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">URL</FormLabel>

                      <FormControl className="flex-grow">
                        <Input {...field} placeholder="Enter URL" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex my-4">
                <Button
                  type="button"
                  intent={`secondary`}
                  className="w-full mr-2 md:mr-6"
                  onClick={() => dispatch(setCloseModal("authConfigForm"))}
                >
                  <span className="inline-flex justify-center w-full">Cancel</span>
                </Button>

                <Button intent={"primary"} className="w-full">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}

        {/* 
        <Form {...baseForm}>
          <form
            onSubmit={baseForm.handleSubmit(onSubmit)}
            className="flex flex-col flex-wrap w-full mb-4"
          >
            <div className="py-4 border-b">
              <h2 className="text-gray-700 text-xl font-bold text-center">
                Authentication & Authorization
              </h2>
            </div>

            <div className="py-2 w-full">
              <FormField
                control={baseForm.control}
                name="authentication_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Authentication Type</FormLabel>

                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select authentication type" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent className="z-[1003]">
                        <SelectItem value="ldap">LDAP</SelectItem>
                        <SelectItem value="oauth">OAuth</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {authenticationType === "ldap" && (
              <>
                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="host_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Host Address</FormLabel>

                        <FormControl className="flex-grow">
                          <Input {...field} placeholder="Enter host address" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="dn"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-700">DN</FormLabel>
                        <FormControl>
                          <RadioGroup
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            className="flex space-y-1 space-x-8"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="user_dn" />
                              </FormControl>
                              <FormLabel className="font-normal">User DN</FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="search_user_dn" />
                              </FormControl>
                              <FormLabel className="font-normal">Search User DN</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-wrap justify-around items-center">
                  <div className="py-2 w-full">
                    <FormField
                      control={form.control}
                      name="dn_pattern"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">DN Pattern</FormLabel>

                          <FormControl className="flex-grow">
                            <Input {...field} placeholder="Set DN pattern" />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button
                      type="button"
                      className="flex items-center gap-x-1 text-drio-red mt-2 px-1"
                    >
                      <span className="text-sm font-medium underline">Validate DN Pattern</span>
                      <HiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="py-4 border-b">
                  <h2 className="text-gray-700 text-xl font-bold">Advanced Configuaration</h2>
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="first_name_attribute"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">First Name Attribute</FormLabel>

                        <FormControl>
                          <Input {...field} placeholder="Enter first name" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="last_name_attribute"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Last Name Attribute</FormLabel>

                        <FormControl>
                          <Input {...field} placeholder="Enter last name" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="group_object_classes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Group Object Classes</FormLabel>

                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Object Type" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent className="z-[1003]">
                            <SelectItem value="mins">0 change for 100 samples</SelectItem>
                            <SelectItem value="hours">
                              0 change for 100 samples in 2 hours
                            </SelectItem>
                            <SelectItem value="days">0 change for 100 samples in 2 days</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="group_base_dn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Group Base DN</FormLabel>

                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Group Base DN" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent className="z-[1003]">
                            <SelectItem value="mins">0 change for 100 samples</SelectItem>
                            <SelectItem value="hours">
                              0 change for 100 samples in 2 hours
                            </SelectItem>
                            <SelectItem value="days">0 change for 100 samples in 2 days</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="group_membership_attribute"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-700">Group Membership Attribute</FormLabel>
                        <FormControl>
                          <RadioGroup
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            className="flex space-y-1 space-x-8"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="user_entry" />
                              </FormControl>
                              <FormLabel className="font-normal">User Entry</FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="group_entry" />
                              </FormControl>
                              <FormLabel className="font-normal">Group Entry</FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="both" />
                              </FormControl>
                              <FormLabel className="font-normal">Both</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {authenticationType === "oauth" && (
              <>
                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="oauth_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Name</FormLabel>

                        <FormControl className="flex-grow">
                          <Input {...field} placeholder="Enter name" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="oauth_key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Key</FormLabel>

                        <FormControl className="flex-grow">
                          <Input {...field} placeholder="Enter key" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="oauth_secret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Secret</FormLabel>

                        <FormControl className="flex-grow">
                          <Input {...field} placeholder="Enter secret" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="accounting_port"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Accounting Port</FormLabel>

                        <FormControl className="flex-grow">
                          <Input {...field} placeholder="Enter accounting port" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="oauth_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">URL</FormLabel>

                        <FormControl className="flex-grow">
                          <Input {...field} placeholder="Enter URL" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {authenticationType === "google" && (
              <>
                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="google_client_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Id</FormLabel>

                        <FormControl className="flex-grow">
                          <Input {...field} placeholder="Enter Id" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2 w-full">
                  <FormField
                    control={form.control}
                    name="google_client_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email</FormLabel>

                        <FormControl className="flex-grow">
                          <Input {...field} placeholder="Enter email" />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            <div className="flex my-4">
              <Button
                type="button"
                intent={`secondary`}
                className="w-full mr-2 md:mr-6"
                onClick={() => dispatch(setCloseModal("authConfigForm"))}
              >
                <span className="inline-flex justify-center w-full">Cancel</span>
              </Button>

              <Button intent={"primary"} className="w-full">
                Save
              </Button>
            </div>
          </form>
        </Form> */}
      </div>
    </div>
  );
};

export default AuthConfig;
