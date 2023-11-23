import Button from "@ui/Button";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { SubmitHandler } from "react-hook-form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setRows } from "@/state/slices/datasetSlice";
import { setCloseModal } from "@/state/slices/uiSlice";

import { HiOutlineClock } from "react-icons/hi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useUpdateDatasetMutation } from "@/api/resources/datasets";

import Image from "next/image";
import { AiFillCaretRight } from "react-icons/ai";
import { RiUploadCloud2Line } from "react-icons/ri";

export default function ViewApprovedContractsForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [update, result] = useUpdateDatasetMutation();

  const datasetState = useAppSelector((state) => state.dataset);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await update({
        ...data,
        id: row?.id,
      }).unwrap();

      dispatch(
        setRows(datasetState.rows.map((row) => (row.id === res.id ? res : row)))
      );

      showAlert("Dataset updated successfully", "success");
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-4">
      <Layout>
        <div className="flex items-center bg-white mb-4 p-6 rounded-lg">
          <Image
            height={40}
            width={40}
            alt="bank-logo"
            src="/images/bank-of-america.svg"
          />

          <h2 className="text-gray-700 ml-4 text-2xl font-bold">
            Data Sharing Contract with B Bank
          </h2>
        </div>

        <div className="mx-auto bg-white py-4 px-12 rounded-lg max-w-5xl">
          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            {/* Validity Timeframe */}
            <div className="w-full px-4 my-4">
              <h3 className="text-xl font-bold mb-2">Validity Timeframe</h3>

              <div className="flex rounded-lg border p-6 divide-x-2">
                <div className="w-1/2 flex flex-col items-center">
                  <span className="text-gray-500 flex gap-x-1 items-center">
                    <MdOutlineCalendarMonth className="w-5 h-5" />
                    Start Date
                  </span>
                  <p className="text-gray-700 font-bold">January 6, 2023</p>
                </div>

                <div className="w-1/2 flex flex-col items-center">
                  <span className="text-gray-500 flex items-cente gap-x-1">
                    <HiOutlineClock className="w-5 h-5" />
                    Duration
                  </span>
                  <p className="text-gray-700 font-bold">6 months</p>
                </div>
              </div>
            </div>

            {/* App Personas */}
            <div className="flex justify-between w-full px-4 my-4">
              <div>
                <h3 className="text-xl font-bold mb-2">App Personas Allowed</h3>

                <div className="flex flex-col gap-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 underline">Loan App</span>
                    <AiFillCaretRight className="text-blue-500 " />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 underline">Marketing</span>
                    <AiFillCaretRight className="text-blue-500 " />
                  </div>
                </div>
              </div>
            </div>

            {/* Limitations */}
            <div className="w-full px-4 my-4">
              <h3 className="text-xl font-bold mb-2">Limitations</h3>

              <div className="flex rounded-lg border p-6 divide-x-2">
                <div className="w-1/2 flex flex-col items-center">
                  <span className="text-drio-red font-bold text-2xl">02</span>
                  <p className="text-gray-500 text-sm text-center">
                    Max number of <br />
                    personas
                  </p>
                </div>

                <div className="w-1/2 flex flex-col items-center">
                  <span className="text-drio-red font-bold text-2xl">56</span>
                  <p className="text-gray-500 text-sm text-center">
                    Max number of <br />
                    accessors
                  </p>
                </div>

                <div className="w-1/2 flex flex-col items-center">
                  <span className="text-drio-red font-bold text-2xl">25</span>
                  <p className="text-gray-500 text-sm text-center">
                    Max daily access <br />
                    frequency limit
                  </p>
                </div>
              </div>
            </div>

            {/* Datasets Covered */}
            <div className="w-full px-4 my-4">
              <h3 className="text-xl font-bold mb-2">Datasets Covered</h3>

              <div className="flex flex-col p-6 divide-y-2">
                <div className="w-full flex justify-between items-center py-6">
                  <span className="text-gray-700 font-bold">All Personas</span>
                  <p className="text-gray-500 text-sm text-center underline">
                    : /api/2022-10-31/ account/Cox/orgunit/dt.com/*
                  </p>
                </div>

                <div className="w-full flex justify-between items-center py-6">
                  <span className="text-gray-700 font-bold">Loan App</span>
                  <p className="text-gray-500 text-sm text-center underline">
                    : /api/2022-10-31/ account/Cox/orgunit/dt.com/*
                  </p>
                </div>

                <div className="w-full flex justify-between items-center py-6">
                  <span className="text-gray-700 font-bold">Marketing App</span>
                  <p className="text-gray-500 text-sm text-center underline">
                    : /api/2022-10-31/ account/Cox/orgunit/dt.com/*
                  </p>
                </div>
              </div>
            </div>

            {/* Legal Addendums */}

            <div className="flex justify-between w-full my-4 px-4">
              <div className="w-full">
                <h3 className="text-xl font-semibold mb-2">Legal Addendums</h3>

                <div className="w-full flex flex-col divide-y-2">
                  <div className="w-full flex flex-col gap-2 py-6">
                    <span className="font-bold text-xl text-gray-700">
                      Privacy
                    </span>
                    <p className="text-gray-500">
                      Contains all the Privacy T&C related to this contract
                    </p>
                    <div>
                      <Button
                        intent={`primary`}
                        iconPosition="right"
                        icon={<AiFillCaretRight className="ml-2" />}
                      >
                        View Policy
                      </Button>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-2 py-6">
                    <span className="font-bold text-xl text-gray-700">
                      Regulatory
                    </span>
                    <p className="text-gray-500">
                      Contains all the Regulatory T&C related to this contract
                    </p>
                    <div>
                      <Button
                        intent={`primary`}
                        iconPosition="right"
                        icon={<AiFillCaretRight className="ml-2" />}
                      >
                        View Policy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="flex flex-col items-center my-4 w-full">
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2">
                  <Image
                    width={40}
                    height={40}
                    alt="bank-logo"
                    src="/images/cox-automotive-2.jpeg"
                  />

                  <span>Cox Automotive Signatory</span>
                </div>

                <div className="bg-[#F9FBFD] text-blue-500 border-dashed border-2 rounded-lg  border-blue-300 flex flex-col items-center justify-center py-8 px-12">
                  <RiUploadCloud2Line className="w-10 h-10 mb-4" />
                  <span className="text-lg font-semibold">
                    Upload signature here
                  </span>
                </div>

                <span className="text-center font-bold text-xl text-gray-700">
                  Marsha Smith
                </span>
              </div>
            </div>

            {/* Submit/Reject */}
            <div className="px-2 py-2 flex gap-4 justify-center w-full mt-4">
              <Button
                type="button"
                intent={`secondary`}
                onClick={() => dispatch(setCloseModal("editDatasetForm"))}
              >
                <span className="inline-flex justify-center w-full">
                  Reject
                </span>
              </Button>

              <Button
                type="button"
                intent={`primary`}
                isLoading={result.isLoading}
              >
                <span className="inline-flex justify-center w-full">
                  Approve
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-white mb-4 p-6 rounded-lg mt-4">
          <Image
            width={40}
            height={40}
            alt="bank-logo"
            src="/images/bank-of-america.svg"
          />

          <h2 className="text-gray-700 ml-4 text-2xl font-bold">
            B Bank Consumption Requirements and Approvals
          </h2>
        </div>

        <div className="mx-auto bg-white py-4 px-12 rounded-lg max-w-5xl mt-4">
          {/* App Personas */}
          <div className="flex justify-between w-full px-4 my-4">
            <div>
              <h3 className="text-xl font-bold mb-2">App Personas Allowed</h3>

              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 underline">Loan App</span>
                  <AiFillCaretRight className="text-blue-500 " />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-blue-500 underline">Marketing</span>
                  <AiFillCaretRight className="text-blue-500 " />
                </div>
              </div>
            </div>
          </div>

          {/* Datasets Covered */}
          <div className="w-full px-4 my-4">
            <h3 className="text-xl font-bold mb-2">Datasets Covered</h3>

            <div className="flex flex-col p-6 divide-y-2">
              <div className="w-full flex justify-between items-center py-6">
                <span className="text-gray-700 font-bold">Marketing App</span>
                <p className="text-gray-500 text-sm text-center underline">
                  : /api/2022-10-31/ account/Cox/orgunit/dt.com/*
                </p>
              </div>
            </div>
          </div>

          {/* Limitations */}
          <div className="w-full px-4 my-4">
            <h3 className="text-xl font-bold mb-2">Limitations</h3>

            <div className="flex rounded-lg border p-6 divide-x-2">
              <div className="w-1/2 flex flex-col items-center">
                <span className="text-drio-red font-bold text-2xl">02</span>
                <p className="text-gray-500 text-sm text-center">
                  Max number of <br />
                  personas
                </p>
              </div>

              <div className="w-1/2 flex flex-col items-center">
                <span className="text-drio-red font-bold text-2xl">56</span>
                <p className="text-gray-500 text-sm text-center">
                  Max number of <br />
                  accessors
                </p>
              </div>

              <div className="w-1/2 flex flex-col items-center">
                <span className="text-drio-red font-bold text-2xl">25</span>
                <p className="text-gray-500 text-sm text-center">
                  Max daily access <br />
                  frequency limit
                </p>
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="flex flex-col items-center my-8 w-full">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <Image
                  width={40}
                  height={40}
                  alt="bank-logo"
                  src="/images/cox-automotive-2.jpeg"
                />

                <span>Cox Automotive Signatory</span>
              </div>

              <div className="bg-[#F9FBFD] text-blue-500 border-dashed border-2 rounded-lg  border-blue-300 flex flex-col items-center justify-center py-8 px-12">
                <RiUploadCloud2Line className="w-10 h-10 mb-4" />
                <span className="text-lg font-semibold">
                  Upload signature here
                </span>
              </div>

              <span className="text-center font-bold text-xl text-gray-700">
                Marsha Smith
              </span>
            </div>
          </div>

          {/* Submit/Reject */}
          <div className="px-2 py-2 flex gap-4 justify-center mt-4">
            <Button
              type="button"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("editDatasetForm"))}
            >
              <span className="inline-flex justify-center w-full">Reject</span>
            </Button>

            <Button
              type="button"
              intent={`primary`}
              isLoading={result.isLoading}
            >
              <span className="inline-flex justify-center w-full">Approve</span>
            </Button>
          </div>
        </div>
      </Layout>
    </div>
  );
}
