import Button from "@ui/Button";
import * as Checkbox from "@radix-ui/react-checkbox";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import * as RadioGroup from "@radix-ui/react-radio-group";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/dataSourceSlice";

import { HiCheck } from "react-icons/hi";

import { useState } from "react";
import { DataSourceFormdata } from "@/api/resources/data-sources/types";
import { useUpdateSecureFlagMutation } from "@/api/resources/data-sources";

export default function DataSourceSecurity({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [secure, setSecure] = useState("true");
  const [skipVerify, setSkipVerify] = useState("true");
  const [patch, result] = useUpdateSecureFlagMutation();
  const skipVerifyValue = () =>
    (secure === "true" && skipVerify === "false") || secure !== "true";

  const onSubmit = async () => {
    const patchData = {
      id: row.id,
      ou_id: row?.ou_id,
      account_id: row?.account_id,
      insecure_skip_verify: skipVerifyValue(),
      secure: secure === "true" ? true : false,
    };

    console.log(patchData);

    try {
      const res = await patch(patchData).unwrap();
      showAlert("Data source updated successfully.", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }

    dispatch(setCloseModal("editSecurityForm"));
  };

  return (
    <>
      <Layout>
        <div className="mx-auto bg-white px-6 py-8 rounded-lg w-[400px]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">
            Edit Security Settings
          </h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <h3 className="px-4 text-gray-700 text-sm font-medium">Secure?</h3>

            <div className="px-4 py-2 w-full">
              <RadioGroup.Root
                value={secure}
                aria-label="Secure"
                onValueChange={setSecure}
                className="flex flex-wrap gap-y-2 gap-x-4 w-full"
              >
                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r1"
                    value={"true"}
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    htmlFor="r1"
                    className="text-gray-500 text-sm font-medium"
                  >
                    True
                  </label>
                </div>

                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r2"
                    value={"false"}
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    htmlFor="r2"
                    className="text-gray-500 text-sm font-medium"
                  >
                    False
                  </label>
                </div>
              </RadioGroup.Root>
            </div>

            {secure === "true" && (
              <>
                <h3 className="px-4 text-gray-700 text-sm font-medium mt-2">
                  Validate certificates?
                </h3>

                <div className="px-4 py-2 w-full">
                  <RadioGroup.Root
                    value={skipVerify}
                    onValueChange={setSkipVerify}
                    aria-label="Validate certificates?"
                    className="flex flex-wrap gap-y-2 gap-x-4 w-full"
                  >
                    <div className="flex items-center gap-x-2">
                      <RadioGroup.Item
                        id="r3"
                        value={"true"}
                        className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                      />
                      <label
                        htmlFor="r3"
                        className="text-gray-500 text-sm font-medium"
                      >
                        True
                      </label>
                    </div>

                    <div className="flex items-center gap-x-2">
                      <RadioGroup.Item
                        id="r4"
                        value={"false"}
                        className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                      />
                      <label
                        htmlFor="r4"
                        className="text-gray-500 text-sm font-medium"
                      >
                        False
                      </label>
                    </div>
                  </RadioGroup.Root>
                </div>
              </>
            )}
          </div>

          <div className="py-2 px-2 flex w-full mt-4 gap-4">
            <Button
              type="button"
              className="w-full"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("editSecurityForm"))}
            >
              <span className="inline-flex justify-center">Cancel</span>
            </Button>

            <Button
              className="w-full"
              intent={`primary`}
              onClick={onSubmit}
              isLoading={result.isLoading}
            >
              <span className="inline-flex justify-center">Update</span>
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
}
