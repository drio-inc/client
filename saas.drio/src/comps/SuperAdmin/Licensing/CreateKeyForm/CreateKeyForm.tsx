import Button from "@ui/Button";
import { TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { useGetLicenseKeyQuery } from "@/api/resources/licenses";
import { useEffect } from "react";

const schema = z.object({
  license: z.string().nonempty("Please Enter a value"),
});

type FormData = z.infer<typeof schema>;

export default function AddNewLicenseForm() {
  const dispatch = useAppDispatch();
  const { data: createKey, refetch } = useGetLicenseKeyQuery({});

  useEffect(() => {
    if (createKey?.licenseKey) {
      refetch();
    }
  }, [createKey?.licenseKey, refetch]);

  const form = useZodForm({
    schema: schema,
  });

  const normalizeLicense =
    createKey?.licenseKey?.split("-").join("").toUpperCase().substring(0, 20) ??
    "";

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      navigator.clipboard.writeText(normalizeLicense);

      showAlert("License copied successfully.", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }

    form.reset();
    dispatch(setCloseModal("createKeyForm"));
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit} className="min-w-[50vw]">
        <div className="w-full mx-auto bg-white p-8 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-bold my-4">Create Key</h2>

          <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50 my-4">
            <div className="px-4 py-2 w-full">
              <TextInput
                disabled
                label={"License"}
                {...form.register("license")}
                defaultValue={normalizeLicense}
                className="md:text-sm 2xl:text-base"
              />
            </div>
          </div>

          <div className="py-2 flex justify-center md:justify-end w-full mt-4">
            <Button
              type="button"
              intent={`secondary`}
              className="w-full md:w-auto mr-2 md:mr-6"
              onClick={() => dispatch(setCloseModal("createKeyForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button
              type="button"
              intent={`primary`}
              className="w-full md:w-auto"
              onClick={() => onSubmit(form.getValues())}
            >
              <span className="inline-flex justify-center w-full">Copy</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
