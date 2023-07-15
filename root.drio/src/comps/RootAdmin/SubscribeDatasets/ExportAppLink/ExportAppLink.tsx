import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { SubmitHandler } from "react-hook-form";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setRows, setAddNewDispatched } from "@/state/slices/datasetSlice";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { usePublishDatasetMutation } from "@/state/services/apiService";
import { HiUpload, HiOutlineDuplicate } from "react-icons/hi";

export default function ExportAppLink({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [publish, result] = usePublishDatasetMutation();

  console.log("row", row);

  const datasetState = useAppSelector((state) => state.dataset);
  const dataSourceState = useAppSelector((state) => state.dataSource);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(setCloseModal("getAppLink"));
  };

  return (
    <Layout>
      <div className="mx-auto bg-white py-4 px-6 rounded-lg min-w-[60vw]">
        <h2 className="text-gray-700 text-2xl font-bold">Get App Link</h2>

        <div className="flex flex-wrap justify-between -m-2 gap-2 rounded-lg my-4 bg-gray-50 border px-2 py-4 shadow-sm">
          <div className="px-4 py-2 w-[34rem] flex items-center gap-x-2 bg-white border rounded-md">
            <label className="font-bold text-gray-700">Dataset:</label>
            <span>{row.dataset}</span>
          </div>

          <div className="px-4 py-2 w-[34rem] flex items-center gap-x-2 bg-white border rounded-md">
            <label className="font-bold text-gray-700">
              Organization / Business Unit:
            </label>
            <span>{row.ou}</span>
          </div>

          <div className="px-4 py-2 w-[34rem] flex items-center gap-x-2 bg-white border rounded-md">
            <label className="font-bold text-gray-700">Acessibility:</label>
            <span>Must have Contract in place to access</span>
          </div>

          <div className="px-4 py-2 w-[34rem] flex items-center gap-x-2 bg-white border rounded-md">
            <label className="font-bold text-gray-700">
              Contract In Place:
            </label>
            <span>{row.contractInPlace}</span>
          </div>

          <div className="px-4 py-2 w-[34rem] flex items-center gap-x-2 bg-white border rounded-md">
            <label className="font-bold text-gray-700">
              Number of Subscribers:
            </label>
            <span>50</span>
          </div>

          <div className="px-4 py-2 w-[34rem] flex items-center gap-x-2 bg-white border rounded-md">
            <label className="font-bold text-gray-700">
              Daily Access Frequency
            </label>
            <span>{row.frequency}</span>
          </div>
        </div>

        <div className="flex flex-wrap flex-col justify-between -m-2 gap-x-2 gap-y-6 rounded-lg my-4 bg-gray-50 border px-2 py-4 shadow-sm">
          <div>
            <h3>For API</h3>
            <div className="relative px-4 py-2 w-full flex items-center gap-x-2 bg-white border rounded-md">
              <span className="text-gray-500">
                /api/2022-10-31/
                organization/Cox/department/dealer.com/dealer_sales.
              </span>

              <div className="absolute flex gap-x-2 text-gray-500 right-2">
                <HiUpload className="w-5 h-5" />
                <HiOutlineDuplicate className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div>
            <h3>For {row.dataset}</h3>
            <div className="relative px-4 py-2 w-full flex flex-col gap-2 bg-white border rounded-md">
              <div className="flex gap-x-4">
                <label className="font-bold text-gray-700">For Kafka</label>
                <span className="text-gray-500">: mykafka.host.com:9093</span>

                <div className="absolute flex gap-x-2 text-gray-500 right-2">
                  <HiUpload className="w-5 h-5" />
                  <HiOutlineDuplicate className="w-5 h-5" />
                </div>
              </div>

              <div className="flex gap-x-4">
                <label className="font-bold text-gray-700">
                  Schema Registry
                </label>
                <span className="text-gray-500">
                  : http://my-schema-registry:8081
                </span>

                <div className="absolute flex gap-x-2 text-gray-500 right-2">
                  <HiUpload className="w-5 h-5" />
                  <HiOutlineDuplicate className="w-5 h-5" />
                </div>
              </div>

              <div className="flex gap-x-4">
                <label className="font-bold text-gray-700">Topic</label>
                <span className="text-gray-500">: Dealer Sales</span>

                <div className="absolute flex gap-x-2 text-gray-500 right-2">
                  <HiUpload className="w-5 h-5" />
                  <HiOutlineDuplicate className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3>For API</h3>
            <div className="relative px-4 py-2 w-full flex items-center gap-x-2 bg-white border rounded-md">
              <span className="text-gray-500">
                <pre>
                  {'{\n\t"Persona" : [“Finance”, “Marketing”, “Analyst”]\n}'}
                </pre>
              </span>

              <div className="absolute flex gap-x-2 text-gray-500 right-2">
                <HiUpload className="w-5 h-5" />
                <HiOutlineDuplicate className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-2 py-2 flex gap-4 justify-end w-full mt-4">
          <Button
            type="button"
            intent={`secondary`}
            onClick={() => dispatch(setCloseModal("getAppLink"))}
          >
            <span className="inline-flex justify-center w-full">Cancel</span>
          </Button>

          <Button intent={`primary`} isLoading={result.isLoading}>
            <span className="inline-flex justify-center w-full">
              Swagger Doc
            </span>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
