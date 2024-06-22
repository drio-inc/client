import Button from "@ui/Button";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/notificationsSlice";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  channel_type: z.string({
    required_error: "Please select an option",
  }),

  url: z.string().nonempty("Please Enter a value"),
});

type FormData = z.infer<typeof schema>;

export default function AddDataSourceForm() {
  const dispatch = useAppDispatch();
  const { rows } = useAppSelector((state) => state.notificationsPage);
  const form = useZodForm({
    schema: schema,
  });

  const webhookOptions = [
    {
      label: "Webhook",
      value: "webhook",
    },
  ];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
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
      showAlert("Notification channel  added successfully", "success");
    } catch (err: any) {
      showAlert(err?.data?.message ?? "Something went wrong. Please try again.", "error");
    }
    7;

    form.reset();
    dispatch(setCloseModal("addNotificationForm"));
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white py-8 px-6 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">Add Notification Channel</h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Name"}
                {...form.register("name")}
                placeholder={"Enter name"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <SelectInput
                label={"Channel Type"}
                options={webhookOptions ?? []}
                registerName="channel_type"
                placeholder={"Select Channel Type"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"URL"}
                {...form.register("url")}
                defaultValue={"notify.google.com"}
                className="md:text-sm 2xl:text-base"
                placeholder={"Enter broker endpoint"}
              />
            </div>
          </div>

          <div className="py-2 px-2 flex w-full mt-4 gap-4">
            <Button
              type="button"
              intent={`secondary`}
              className="w-full"
              onClick={() => dispatch(setCloseModal("addNotificationForm"))}
            >
              <span className="inline-flex justify-center">Cancel</span>
            </Button>

            <Button intent={`primary`} className="w-full">
              <span className="inline-flex justify-center">Add Channel</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
