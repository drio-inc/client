import Button from "@ui/Button";
import { SelectInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import LicenseDetails from "../LicenseDetails/LicenseDetails";

import { useCreateLicenseMutation } from "@/api/resources/ddx";
import { setRows } from "@/state/slices/licensingSlice";

const schema = z.object({
  account: z.string({
    required_error: "Please Enter a value",
  }),
  sku: z.string({
    required_error: "Please Enter a value",
  }),
  licenseType: z.string({
    required_error: "Please Enter a value",
  }),
});

type FormData = z.infer<typeof schema>;

export default function UpdateLicenseForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [create, result] = useCreateLicenseMutation();
  const ddxSstate = useAppSelector((state) => state.DDX);
  const adminAccountState = useAppSelector((state) => state.adminAccount);
  const licenseState = useAppSelector((state) => state.licensing);

  const options = adminAccountState.rows.map((row) => {
    return {
      label: row.name,
      value: row.name.split(" ").join("_").toLowerCase(),
    };
  });

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await create({
        ...data,
      }).unwrap();

      if (res) {
        dispatch(setRows([...licenseState.rows, res]));
        showAlert("License created successfully", "success");
      }
    } catch (err: any) {
      console.log(err);

      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }

    form.reset();
    dispatch(setCloseModal("addNewLicenseForm"));
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit} className="min-w-[50vw]">
        <div className="w-full mx-auto bg-white p-8 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-bold my-4">
            Account License
          </h2>

          <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50 my-4">
            <div className="px-4 py-2 w-full">
              <SelectInput
                registerName="account"
                label={"For Account"}
                placeholder={"Select Account"}
                options={options}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <SelectInput
                registerName="sku"
                label={"Product SKU"}
                placeholder={"Enter SKU"}
                options={[
                  { label: "SKU 1", value: "sku_1" },
                  { label: "SKU 2", value: "sku_2" },
                  { label: "SKU 3", value: "sku_3" },
                ]}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <SelectInput
                registerName="licenseType"
                label={"License Type"}
                placeholder={"Enter type"}
                options={[
                  { label: "Demo", value: "demo" },
                  { label: "Medium", value: "medium" },
                  { label: "Standard", value: "standard" },
                ]}
                className="md:text-sm 2xl:text-base"
              />
            </div>
          </div>

          <div className="flex flex-wrap -m-2 shadow-md p-2 rounded-lg bg-gray-50 my-4">
            <LicenseDetails details={ddxSstate.licenseDetails ?? {}} />
          </div>

          <div className="py-2 flex justify-center md:justify-end w-full mt-4">
            <Button
              type="button"
              intent={`secondary`}
              className="w-full md:w-auto mr-2 md:mr-6"
              onClick={() => dispatch(setCloseModal("addNewLicenseForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button
              intent={`primary`}
              className="w-full md:w-auto"
              isLoading={result.isLoading}
            >
              <span className="inline-flex justify-center w-full">Create</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
