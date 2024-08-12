import Link from "next/link";
import Button from "@ui/Button";
import { useState } from "react";
import Layout from "@/comps/Layout";
import { SubmitHandler } from "react-hook-form";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { HiOutlineClock, HiOutlineTrash } from "react-icons/hi";
import { MdOutlineCalendarMonth } from "react-icons/md";

import Image from "next/image";
import Modal from "@/comps/ui/Modal";
import { FaArrowRight } from "react-icons/fa";
import { AiFillCaretRight } from "react-icons/ai";
import { RiUploadCloud2Line } from "react-icons/ri";
import { transformContractRules } from "@/functions/flattenRules";
import RulesTable from "@/comps/RootAdmin/Triggers/ContractRules/RulesTable";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

type ImageSelect = React.ChangeEvent<HTMLInputElement>;

export default function ViewConsumerContractsForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const contractRuleState = useAppSelector((state) => state.contractRule);
  const [senderSignatureImage, setSenderSignatureImage] = useState<Blob | null>(null);
  const [receiverSignatureImage, setReceiverSignatureImage] = useState<Blob | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {};

  return (
    <div className="h-full flex items-center justify-center">
      <Layout>
        <div className="flex items-center bg-white mb-4 p-4 rounded-lg">
          <Image width={40} height={40} alt="bank-logo" src="/images/bank-of-america.svg" />

          <h2 className="text-gray-700 ml-4 text-2xl font-bold">
            Data Sharing Contract with B Bank
          </h2>
        </div>

        <div className="mx-auto bg-white py-2 px-8 rounded-lg max-w-5xl">
          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            {/* Validity Timeframe */}
            <div className="w-full px-4 my-2">
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
            <div className="flex justify-between w-full px-4 my-2">
              <div>
                <h3 className="text-xl font-bold mb-2">App Personas Allowed</h3>

                <div className="flex flex-col gap-y-2">
                  <Link
                    href={"/data-contracts/consuming-app-personas"}
                    className="flex items-center gap-2"
                  >
                    <span className="text-blue-500 underline">Loan App</span>
                    <AiFillCaretRight className="text-blue-500 " />
                  </Link>

                  <Link
                    href={"/data-contracts/consuming-app-personas"}
                    className="flex items-center gap-2"
                  >
                    <span className="text-blue-500 underline">Marketing</span>
                    <AiFillCaretRight className="text-blue-500 " />
                  </Link>
                </div>
              </div>
            </div>

            {/* Limitations */}
            <div className="w-full px-4 my-2">
              <h3 className="text-xl font-bold mb-2">Limitations</h3>

              <div className="flex rounded-lg border p-4 divide-x-2">
                <div className="w-1/2 flex flex-col items-center">
                  <span className="text-drio-red font-bold text-2xl">02</span>
                  <p className="text-gray-500 text-sm text-center">Max number of personas</p>
                </div>

                <div className="w-1/2 flex flex-col items-center">
                  <span className="text-drio-red font-bold text-2xl">56</span>
                  <p className="text-gray-500 text-sm text-center">Max number of accessors</p>
                </div>

                <div className="w-1/2 flex flex-col items-center">
                  <span className="text-drio-red font-bold text-2xl">25</span>
                  <p className="text-gray-500 text-sm text-center">
                    Max daily access frequency limit
                  </p>
                </div>
              </div>
            </div>

            {/* Datasets Covered */}
            <div className="w-full px-4 my-2">
              <h3 className="text-xl font-bold">Datasets Covered</h3>

              <div className="flex flex-col divide-y-2">
                <div className="w-full flex justify-between items-center py-4">
                  <span className="text-gray-700 font-bold">All Personas</span>
                  <p className="text-gray-500 text-sm text-center underline">
                    : /api/2022-10-31/ account/Cox/orgunit/dt.com/*
                  </p>
                </div>

                <div className="w-full flex justify-between items-center py-4">
                  <span className="text-gray-700 font-bold">Loan App</span>
                  <p className="text-gray-500 text-sm text-center underline">
                    : /api/2022-10-31/ account/Cox/orgunit/dt.com/*
                  </p>
                </div>

                <div className="w-full flex justify-between items-center py-4">
                  <span className="text-gray-700 font-bold">Marketing App</span>
                  <p className="text-gray-500 text-sm text-center underline">
                    : /api/2022-10-31/ account/Cox/orgunit/dt.com/*
                  </p>
                </div>
              </div>
            </div>

            {/* App Authentication Mechanism */}
            <div className="w-full px-4 my-2">
              <h3 className="text-xl font-bold">App Authentication Mechanism</h3>

              <div className="flex flex-col divide-y-2">
                <div className="w-full flex justify-between items-center py-4">
                  <span className="text-gray-700 font-bold">ldap://coreldap.bbank.com</span>
                  <FaArrowRight className="w-5 h-5 text-drio-red" />
                </div>

                <div className="w-full flex justify-between items-center py-4">
                  <span className="text-gray-700 font-bold">ldap://coreldap.bbank.com</span>
                  <FaArrowRight className="w-5 h-5 text-drio-red" />
                </div>

                <div className="w-full flex justify-between items-center py-4">
                  <span className="text-gray-700 font-bold">ldap://coreldap.bbank.com</span>
                  <FaArrowRight className="w-5 h-5 text-drio-red" />
                </div>
              </div>
            </div>

            {/* Legal Addendums */}
            <div className="flex justify-between w-full my-2 px-4">
              <div className="w-full">
                <h3 className="text-xl font-semibold">Legal Addendums</h3>

                <div className="w-full flex flex-col divide-y-2 gap-y-2">
                  {contractRuleState.rows.map((r) => (
                    <div className="w-full flex flex-col gap-2 py-2" key={r.id}>
                      <span className="font-bold text-xl text-gray-700 capitalize">{r.type}</span>
                      <p className="text-gray-500">
                        Lorem ipsum dolor sit amet consectetur. A ut turpis dui integer egestas
                        tincidunt enim. In nec gravida tempor molestie varius. Libero dolor bibendum
                        quis nec lectus hac. Pellentesque aliquam amet hendrerit condimentum nullam.
                        Dolor morbi mauris nunc phasellus diam. Varius pellentesque sed morbi
                        vestibulum cursus. Tellus hendrerit in viverra ornare.
                      </p>
                      <div>
                        <Button
                          intent={`primary`}
                          iconPosition="right"
                          icon={<AiFillCaretRight className="ml-2" />}
                          onClick={() => dispatch(setOpenModal(`contractRulesTable-${r.id}`))}
                        >
                          View Contract Rule
                        </Button>
                      </div>

                      <div className="hidden">
                        <Modal
                          label="View"
                          identifier={`contractRulesTable-${r.id}`}
                          onClick={() => dispatch(setOpenModal(`contractRulesTable-${r.id}`))}
                        >
                          <RulesTable modal={true} rows={transformContractRules(r.rules)} />
                        </Modal>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Approved/Rejected Status */}
            <div className="flex items-center justify-between mt-16 mb-4 w-full px-4">
              <div className="flex flex-col items-center justify-center gap-y-2">
                <div className="flex items-center bg-green-600 px-6 py-3 rounded-md">
                  <IoCheckmarkCircleSharp className="text-white w-5 h-5 mr-2" />
                  <span className="text-white font-bold">Approved</span>
                </div>

                <span>June 03, 2023</span>
              </div>
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

                <span className="text-center font-bold text-xl text-gray-700">Marsha Smith</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-white mb-4 p-6 rounded-lg mt-4">
          <Image width={40} height={40} alt="bank-logo" src="/images/bank-of-america.svg" />

          <h2 className="text-gray-700 ml-4 text-2xl font-bold">
            B Bank Consumption Requirements and Approvals
          </h2>
        </div>

        <div className="mx-auto bg-white py-8 px-12 rounded-lg max-w-5xl mt-4">
          {/* App Personas */}
          <div className="flex justify-between w-full px-4 my-2">
            <div>
              <h3 className="text-xl font-bold mb-2">App Personas Allowed</h3>

              <div className="flex flex-col gap-y-2">
                <Link
                  href={"/data-contracts/consuming-app-personas"}
                  className="flex items-center gap-2"
                >
                  <span className="text-blue-500 underline">Loan App</span>
                  <AiFillCaretRight className="text-blue-500 " />
                </Link>

                <Link
                  href={"/data-contracts/consuming-app-personas"}
                  className="flex items-center gap-2"
                >
                  <span className="text-blue-500 underline">Marketing</span>
                  <AiFillCaretRight className="text-blue-500 " />
                </Link>
              </div>
            </div>
          </div>

          {/* Datasets Covered */}
          <div className="w-full px-4 my-2">
            <h3 className="text-xl font-bold">Datasets Covered</h3>

            <div className="flex flex-col py-2 divide-y-2">
              <div className="w-full flex justify-between items-center">
                <span className="text-gray-700 font-bold">Marketing App</span>
                <p className="text-gray-500 text-sm text-center underline">
                  : /api/2022-10-31/ account/Cox/orgunit/dt.com/*
                </p>
              </div>
            </div>
          </div>

          {/* App Authentication Mechanism */}
          <div className="w-full px-4 my-2">
            <h3 className="text-xl font-bold">App Authentication Mechanism</h3>

            <div className="flex flex-col divide-y-2">
              <div className="w-full flex justify-between items-center py-4">
                <span className="text-gray-700 font-bold">ldap://coreldap.bbank.com</span>
                <FaArrowRight className="w-5 h-5 text-drio-red" />
              </div>

              <div className="w-full flex justify-between items-center py-4">
                <span className="text-gray-700 font-bold">ldap://coreldap.bbank.com</span>
                <FaArrowRight className="w-5 h-5 text-drio-red" />
              </div>

              <div className="w-full flex justify-between items-center py-4">
                <span className="text-gray-700 font-bold">ldap://coreldap.bbank.com</span>
                <FaArrowRight className="w-5 h-5 text-drio-red" />
              </div>
            </div>
          </div>

          {/* Limitations */}
          <div className="w-full px-4 my-2">
            <h3 className="text-xl font-bold mb-2">Limitations</h3>

            <div className="flex rounded-lg border p-6 divide-x-2">
              <div className="w-1/2 flex flex-col items-center">
                <span className="text-drio-red font-bold text-2xl">02</span>
                <p className="text-gray-500 text-sm text-center">Max number of personas</p>
              </div>

              <div className="w-1/2 flex flex-col items-center">
                <span className="text-drio-red font-bold text-2xl">56</span>
                <p className="text-gray-500 text-sm text-center">Max number of accessors</p>
              </div>

              <div className="w-1/2 flex flex-col items-center">
                <span className="text-drio-red font-bold text-2xl">25</span>
                <p className="text-gray-500 text-sm text-center">
                  Max daily access frequency limit
                </p>
              </div>
            </div>
          </div>

          {/* Approved/Rejected Status */}
          <div className="flex items-center justify-between mt-16 mb-4 w-full px-4">
            <div className="flex flex-col items-center justify-center gap-y-2">
              <div className="flex items-center bg-green-600 px-6 py-3 rounded-md">
                <IoCheckmarkCircleSharp className="text-white w-5 h-5 mr-2" />
                <span className="text-white font-bold">Approved</span>
              </div>

              <span>June 03, 2023</span>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <Image width={40} height={40} alt="bank-logo" src="/images/cox-automotive-2.jpeg" />

                <span>Cox Automotive Signatory</span>
              </div>

              <span className="text-center font-bold text-xl text-gray-700">Marsha Smith</span>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
