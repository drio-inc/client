import Button from "@ui/Button";
import { useState } from "react";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import {
  setRows,
  setRawRows,
  setAddNewDispatched,
} from "@/state/slices/datasetSlice";
import { HiOutlineDownload } from "react-icons/hi";
import * as RadioGroup from "@radix-ui/react-radio-group";

import {
  useGetDatasetsQuery,
  useCreateDatasetMutation,
} from "@/api/resources/datasets";
import { useGenerateDDXTokenMutation } from "@/api/resources/ddx";
import { useRouter } from "next/router";
import getDatasets from "@/functions/getDatasets";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  data_source_id: z.string({
    required_error: "Please select an option",
  }),

  partition_count: z.string().nonempty("Please Enter a value"),
  segment_bytes: z.string().nonempty("Please Enter a value"),
  cleanup_policy: z.string().nonempty("Please Enter a value"),
  replication_factor: z.string().nonempty("Please Enter a value"),

  // topic: z.string({
  //   required_error: "Please select an option",
  // }),

  // baseURL: z
  //   .string()
  //   .nonempty("Please Enter a value")
  //   .url("Please enter a valid URL"),
});

type FormData = z.infer<typeof schema>;

const topicOptions = [
  { label: "All", value: "all" },
  { label: "MySQL", value: "mysql" },
  { label: "Purchase", value: "purchase" },
];

export default function PublishDatasetForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [publish, result] = useCreateDatasetMutation();
  const [visibility, setVisibility] = useState("private");
  const datasetState = useAppSelector((state) => state.dataset);
  // const { data: datasets, isLoading } = useGetDatasetsQuery();
  const dataSourceState = useAppSelector((state) => state.dataSource);
  const [generateDDXToken, tokenResult] = useGenerateDDXTokenMutation();
  const [selectedJSON, setSelectedJSON] = useState<Blob | File | null>(null);

  const dataSourceOptions = dataSourceState.rows.length
    ? dataSourceState.rows?.map((row) => {
        return {
          label: row.name,
          value: row.id,
        };
      })
    : [];

  const form = useZodForm({
    schema: schema,
  });

  const onAddNew = (selectedOption?: string) => {
    if (selectedOption === "add_new") {
      dispatch(setAddNewDispatched(true));

      dispatch(setCloseModal("publishDatasetForm"));
      dispatch(setOpenModal("addDataSourceForm"));
      return;
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const ddxCluster = dataSourceState?.rows?.find(
      (row) => row.id === data.data_source_id
    );

    // if (visibility === "") {
    //   showAlert("Please select a visibility", "error");
    //   return;
    // }

    // if (!selectedJSON) {
    //   showAlert("Please select a JSON file", "error");
    //   return;
    // }

    try {
      const res = await generateDDXToken({
        ou_id: ddxCluster?.ou_id,
        account_id: ddxCluster?.account_id,
        cluster_id: ddxCluster?.cluster_id,
      }).unwrap();

      if (res.ddx_cluster.token) {
        const dataSourcePayload = datasetState.rawRows.find(
          (row) => row.data_source_id === data.data_source_id
        );

        console.log(dataSourcePayload);

        let datasetFormdata: any = {
          token: res.ddx_cluster.token,
          data_source_id: data.data_source_id,
          ddxcluster_id: ddxCluster?.cluster_id,
          topics: [data.name],
          topics_details: [
            {
              name: data.name,
              partition_count: Number(data.partition_count),
              replication_factor: Number(data.replication_factor),
              configs: {
                "cleanup.policy": data.cleanup_policy,
                "segment.bytes": Number(data.segment_bytes),
              },
            },
          ],
        };

        if (dataSourcePayload && dataSourcePayload?.topics.length) {
          datasetFormdata = {
            ...datasetFormdata,
            topics: [...dataSourcePayload?.topics, data.name],
            topics_details: [
              ...dataSourcePayload?.topics_details,
              ...datasetFormdata?.topics_details,
            ],
          };
        }

        console.log(datasetFormdata);

        try {
          const response = await publish(datasetFormdata).unwrap();

          if (response) {
            const dataSourceIds = dataSourceState.rows.map((row) => ({
              ou_id: row.ou_id,
              datasource_id: row.id,
              account_id: row.account_id,
            }));

            const ds = await getDatasets(dataSourceIds);

            if (ds) {
              dispatch(setRows(ds.data));
              dispatch(setRawRows(ds.rawData));
              dispatch(setCloseModal("publishDatasetForm"));
              showAlert("Dataset published successfully", "success");
            }
          }
        } catch (error: any) {
          console.log(error);
          showAlert(error?.data?.message ?? "Something went wrong 2", "error");
        }
      }
    } catch (error: any) {
      console.log(error);
      showAlert(error?.data?.message ?? "Something went wrong 1", "error");
    }
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white p-4 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">
            Publish Dataset
          </h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <div className="px-4 py-2 w-full">
              <SelectInput
                menuPlacement="bottom"
                placeholder={"Select"}
                defaultSelectedValue={
                  {
                    label: dataSourceState?.defaultSource?.sourceName,
                    value: dataSourceState?.defaultSource?.id
                      .split(" ")
                      .join("_")
                      .toLowerCase(),
                  } ?? null
                }
                label={"Select Data Source"}
                registerName="data_source_id"
                onChangeCustomAction={onAddNew}
                className="md:text-sm 2xl:text-base"
                options={[
                  ...dataSourceOptions,
                  { label: "Add New", value: "add_new" },
                ]}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <SelectInput
                registerName="topic"
                options={topicOptions}
                placeholder={"Select"}
                label={"Select Topic Dataset"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            {/* <div className="px-4 py-2 w-full">
              <TextInput
                label={"Base URL"}
                placeholder={"Enter URL"}
                {...form.register("baseURL")}
                defaultValue={`https://example.com`}
                className="md:text-sm 2xl:text-base"
              />
            </div> */}

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Set Dataset Name"}
                {...form.register("name")}
                placeholder={"Enter display name"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                min={0}
                type="number"
                defaultValue={0}
                label={"Partition Count"}
                className="md:text-sm 2xl:text-base"
                placeholder={"Enter partition count"}
                {...form.register("partition_count")}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                min={0}
                type="number"
                defaultValue={0}
                label={"Replication Factor"}
                className="md:text-sm 2xl:text-base"
                {...form.register("replication_factor")}
                placeholder={"Enter replication factor"}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Cleanup Policy"}
                className="md:text-sm 2xl:text-base"
                {...form.register("cleanup_policy")}
                placeholder={"Enter cleanup policy"}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                min={0}
                type="number"
                defaultValue={0}
                label={"Segment Bytes"}
                {...form.register("segment_bytes")}
                placeholder={"Enter segment bytes"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            {/* <h3 className="px-4">Set Visibility</h3>

            <div className="px-4 py-2 w-full">
              <RadioGroup.Root
                value={visibility}
                aria-label="Set Visibility"
                onValueChange={setVisibility}
                className="flex flex-wrap gap-y-2 justify-between w-full"
              >
                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r1"
                    value="private"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    htmlFor="r1"
                    className="text-gray-500 text-sm font-medium"
                  >
                    Private
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r2"
                    value="contractual"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="r2"
                  >
                    Contractual
                  </label>
                </div>

                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r2"
                    value="public"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="r2"
                  >
                    Public
                  </label>
                </div>
              </RadioGroup.Root>
            </div> */}

            {/* <div className="px-4 py-2 w-full flex flex-col gap-y-2">
              <label className="inline-block text-gray-700 text-sm font-medium">
                Set Subscriber View
              </label>

              <span className="border py-2 px-3 my-1 rounded-md shadow-sm border-gray-300 text-gray-400">
                {selectedJSON?.name ?? "Select a json file with example data"}
              </span>

              <input
                hidden
                type="file"
                id="upload-json"
                accept=".json,application/json"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSelectedJSON(
                    event?.target?.files && event?.target?.files[0]
                  );
                }}
              />
            </div>

            <div className="flex flex-wrap gap-y-2 w-full justify-between px-4 py-2">
              <button
                type="button"
                onClick={() => document.getElementById("upload-json")?.click()}
                className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center rounded border-2 border-indigo-200 text-drio-red-dark"
              >
                <HiOutlineDownload className="mr-1 font-bold rotate-180" />
                <span className="text-sm font-medium">Upload</span>
              </button>
            </div> */}
          </div>

          <div className="px-2 py-2 flex gap-4 justify-center w-full mt-4">
            <Button
              type="button"
              className="w-full"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("publishDatasetForm"))}
            >
              <span className="inline-flex justify-center">Cancel</span>
            </Button>

            <Button
              intent={`primary`}
              className="w-full"
              isLoading={result.isLoading}
            >
              <span className="inline-flex justify-center">Publish</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
