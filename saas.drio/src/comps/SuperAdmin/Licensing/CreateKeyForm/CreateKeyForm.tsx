import Button from "@ui/Button";
import { TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/adminAccountSlice";
import { useAddAccountMutation } from "@/state/services/apiService";

const schema = z.object({
  license: z.string().nonempty("Please Enter a value"),
});

type FormData = z.infer<typeof schema>;

export default function AddNewLicenseForm() {
  const dispatch = useAppDispatch();
  const [addAccount, result] = useAddAccountMutation();
  const { rows } = useAppSelector((state) => state.adminAccount);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await addAccount({
        ...data,
      }).unwrap();

      // dispatch(setRows([...rows, res]));
      showAlert("License created successfully.", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
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
                className="md:text-sm 2xl:text-base"
                {...form.register("license")}
                label={"License"}
                placeholder={"AQFW23H9027KLWEB"}
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
              intent={`primary`}
              className="w-full md:w-auto"
              isLoading={result.isLoading}
            >
              <span className="inline-flex justify-center w-full">Copy</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
