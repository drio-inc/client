import { z } from "zod";
import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { setRows } from "@/state/slices/personaSlice";
import { setCloseModal } from "@/state/slices/uiSlice";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import { Button as ButtonV2 } from "@/comps/ui/Button/ButtonV2";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/comps/ui/Forms/FormV2";

import { Textarea } from "@/comps/ui/Textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/comps/ui/Popover";

import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/comps/ui/Command";

import cn from "@/utils/cn";
import { Input } from "@/comps/ui/Input";

const schema = z.object({
  name: z.string({
    required_error: "Please enter a name",
  }),

  domain: z.string({
    required_error: "Please select a domain",
  }),

  ruleset_name: z.string({
    required_error: "Please select a ruleset name",
  }),

  description: z.string({
    required_error: "Please enter a description",
  }),
});

const domainOptions = [
  {
    id: "network_security",
    name: "Network Security",
  },
  {
    id: "customer_data",
    name: "Customer Data",
  },
  {
    id: "user_profiles",
    name: "User Profiles",
  },
  {
    id: "sales_records",
    name: "Sales Records",
  },
  {
    id: "automobile_manufacturing",
    name: "Automobile Manufacturing",
  },
  {
    id: "inventory_management",
    name: "Inventory Management",
  },
  {
    id: "employee_records",
    name: "Employee Records",
  },
  {
    id: "finance",
    name: "Finance",
  },
  {
    id: "project_management",
    name: "Project Management",
  },
  {
    id: "vendor_information",
    name: "Vendor Information",
  },
  {
    id: "compliance_logs",
    name: "Compliance Logs",
  },
  {
    id: "audit_reports",
    name: "Audit Reports",
  },
  {
    id: "marketing_data",
    name: "Marketing Data",
  },
  {
    id: "client_services",
    name: "Client Services",
  },
  {
    id: "support_tickets",
    name: "Support Tickets",
  },
  {
    id: "supply_chain",
    name: "Supply Chain",
  },
  {
    id: "product_catalog",
    name: "Product Catalog",
  },
  {
    id: "billing_info",
    name: "Billing Info",
  },
  {
    id: "contract_management",
    name: "Contract Management",
  },
  {
    id: "asset_tracking",
    name: "Asset Tracking",
  },
  {
    id: "data_analytics",
    name: "Data Analytics",
  },
  {
    id: "security_logs",
    name: "Security Logs",
  },
];
type FormData = z.infer<typeof schema>;

const EditPersonaForm = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const personaState = useAppSelector((state) => state.personas);
  const [openDomainPopover, setOpenDomainPopover] = useState(false);
  const [openRulesetPopover, setOpenRulesetPopover] = useState(false);
  const contractRuleState = useAppSelector((state) => state.contractRule);

  const rulesetOptions = contractRuleState.rows.map((rule) => ({
    id: rule.name.toLowerCase().replace(" ", "_"),
    name: rule.name,
  }));

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: row.name,
      domain: row.domain,
      description: row.description,
      ruleset_name: row.ruleset_name,
    },
  });

  const onSubmit = async (data: FormData) => {
    const updatedRow = {
      ...row,
      ...data,
    };

    dispatch(
      setRows(personaState.rows.map((persona) => (persona.id === row.id ? updatedRow : persona)))
    );

    dispatch(setCloseModal("editPersonaForm"));
    showAlert("Persona updated successfully", "success");
  };

  return (
    <div className={"px-8 py-2 flex flex-col shadow-lg rounded-lg bg-white w-[400px]"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-wrap w-full mb-4"
        >
          <div className="pt-4 border-b">
            <h2 className="text-gray-700 text-2xl font-bold text-center">
              Add New Application Persona
            </h2>
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Name of Persona</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="Sample Persona" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-gray-700">Domain</FormLabel>
                  <Popover open={openDomainPopover} onOpenChange={setOpenDomainPopover}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <ButtonV2
                          role="combobox"
                          variant="outline"
                          className={cn("w-full justify-between", !field.value && "text-gray-400")}
                        >
                          {field.value
                            ? domainOptions.find((domain) => domain.id === field.value)?.name
                            : "Select domain"}
                          <HiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </ButtonV2>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="w-[320px] p-0 z-[1003] bg-white">
                      <Command>
                        <CommandInput placeholder="Search domain..." />
                        <CommandList>
                          <CommandEmpty>No domains found.</CommandEmpty>
                          <CommandGroup>
                            {domainOptions.map((domain) => (
                              <CommandItem
                                key={domain.id}
                                value={domain.id}
                                className="flex justify-between"
                                onSelect={() => {
                                  form.setValue("domain", domain.id);
                                  setOpenDomainPopover(false);
                                }}
                              >
                                {domain.name}

                                <HiCheck
                                  className={cn(
                                    "mr-2 h-4 w-4 text-drio-red-dark",
                                    domain.id === field.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="ruleset_name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-gray-700">Ruleset Name</FormLabel>
                  <Popover open={openRulesetPopover} onOpenChange={setOpenRulesetPopover}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <ButtonV2
                          role="combobox"
                          variant="outline"
                          className={cn("w-full justify-between", !field.value && "text-gray-400")}
                        >
                          {field.value
                            ? rulesetOptions.find((ruleset) => ruleset.id === field.value)?.name
                            : "Select ruleset"}
                          <HiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </ButtonV2>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="w-[320px] p-0 z-[1003] bg-white">
                      <Command>
                        <CommandInput placeholder="Search ruleset..." />
                        <CommandList>
                          <CommandEmpty>No rulesets found.</CommandEmpty>
                          <CommandGroup>
                            {rulesetOptions.map((ruleset) => (
                              <CommandItem
                                key={ruleset.id}
                                value={ruleset.id}
                                className="flex justify-between"
                                onSelect={() => {
                                  form.setValue("ruleset_name", ruleset.id);
                                  setOpenRulesetPopover(false);
                                }}
                              >
                                {ruleset.name}

                                <HiCheck
                                  className={cn(
                                    "mr-2 h-4 w-4 text-drio-red-dark",
                                    ruleset.id === field.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Description</FormLabel>

                  <FormControl>
                    <Textarea rows={6} {...field} placeholder="Type a description here." />
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
              onClick={() => dispatch(setCloseModal("editPersonaForm"))}
            >
              Cancel
            </Button>
            <Button intent={"primary"} className="w-[164px]">
              Save Persona
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditPersonaForm;
