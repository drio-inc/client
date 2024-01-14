import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { v4 as uuidv4 } from "uuid";
import { TextInput } from "@ui/Forms/Inputs";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setRows } from "@/state/slices/metadataSlice";
import { setCloseModal } from "@/state/slices/uiSlice";

import { useCallback, useState } from "react";
import { TagInput } from "@/comps/ui/Forms/Inputs/Inputs";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useEditMetadataMutation } from "@/api/resources/metadata";

import { FaCheckSquare } from "react-icons/fa";
import { BsXSquareFill } from "react-icons/bs";

interface ITag {
  id: string;
  name: string;
  status: string;
}

const schema = z.object({
  name: z.string().optional(),
  dataType: z.string().optional(),
  sampleValue: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditMetadataForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [updateMetadata, result] = useEditMetadataMutation();
  const { rows } = useAppSelector((state) => state.metadata);

  const [visibility, setVisibility] = useState(
    row.visibility.toLowerCase() ?? ""
  );

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (visibility === "") {
      showAlert("Please select a visibility", "error");
      return;
    }

    const newData = {
      ...data,
      id: row.id,
      visibility,
      tags: row.tags,
      lastUpdated: new Date().toLocaleDateString(),
    };

    dispatch(
      setRows(rows.map((row) => (row.id === newData.id ? newData : row)))
    );

    form.reset();
    dispatch(setCloseModal("editMetadataForm"));
    showAlert("Metadata updated successfully", "success");
  };

  const approveOrReject = (
    tag: string,
    action: "Approved" | "Rejected" = "Approved"
  ) => {
    const findRow = rows.find((r) => r.id === row.id);
    const findTag = findRow?.tags.find((m: ITag) => m.name === tag);

    if (findTag) {
      dispatch(
        setRows(
          rows.map((r) => {
            if (r.id !== row.id) return r;

            return {
              ...r,
              tags: r.tags.map((m: ITag) => {
                if (m.name !== tag) return m;

                return {
                  ...m,
                  status: action,
                };
              }),
            };
          })
        )
      );
    }
  };

  const handleTagChange = useCallback(
    (tag: string) => {
      dispatch(
        setRows(
          rows.map((r) => {
            if (r.id !== row.id) return r;

            return {
              ...r,
              tags: [...r.tags, { id: uuidv4(), name: tag, status: "Pending" }],
            };
          })
        )
      );
    },
    [dispatch, row.id, rows]
  );

  return (
    <Layout>
      <Form
        form={form}
        onSubmit={onSubmit}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        <div className="mx-auto bg-white p-8 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">
            Edit Metadata
          </h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <div className="px-4 py-2 w-full">
              <TextInput
                defaultValue={row.name}
                label={"Metadata Name"}
                {...form.register("name")}
                placeholder={"Enter metadata name"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Enter Data Type"}
                defaultValue={row.dataType}
                {...form.register("dataType")}
                placeholder={"Enter data type"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Sample Value"}
                defaultValue={row.sampleValue}
                {...form.register("sampleValue")}
                placeholder={"Enter sample value"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <h3 className="px-4 inline-block text-gray-700 text-sm font-medium">
              Set Visibility
            </h3>

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
                    value="internal"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    htmlFor="r1"
                    className="text-gray-500 text-sm font-medium"
                  >
                    Internal
                  </label>
                </div>
                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r2"
                    value="hidden"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label
                    className="text-gray-500 text-sm font-medium"
                    htmlFor="r2"
                  >
                    Hidden
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
            </div>

            <div className="px-4 py-2 w-full">
              <TagInput
                onTagsChange={handleTagChange}
                label="Metadata Tags (Type and press enter to add)"
              >
                <ul className={`flex flex-wrap w-auto flex-shrink`}>
                  {row?.tags?.map((tag: ITag, index: number) => (
                    <li
                      key={index}
                      className={`flex justify-center items-center rounded-md p-1 border mx-1 my-2 gap-x-1 ${
                        tag.status === "Approved"
                          ? "bg-green-100 text-green-700 border-green-700"
                          : tag.status === "Rejected"
                          ? "bg-red-100 text-red-700 border-red-700 "
                          : "text-gray-500 border-gray-500"
                      }`}
                    >
                      <span className="text-sm">{tag.name}</span>

                      {tag.status === "Pending" ? (
                        <>
                          <span
                            onClick={() =>
                              approveOrReject(tag.name, "Approved")
                            }
                          >
                            <FaCheckSquare className="text-green-500 cursor-pointer" />
                          </span>

                          <span
                            onClick={() =>
                              approveOrReject(tag.name, "Rejected")
                            }
                          >
                            <BsXSquareFill className="text-red-500 cursor-pointer" />
                          </span>
                        </>
                      ) : tag.status === "Approved" ? (
                        <span
                          onClick={() => approveOrReject(tag.name, "Rejected")}
                        >
                          <BsXSquareFill className="text-red-500 cursor-pointer" />
                        </span>
                      ) : tag.status === "Rejected" ? (
                        <span
                          onClick={() => approveOrReject(tag.name, "Approved")}
                        >
                          <FaCheckSquare className="text-green-500 cursor-pointer" />
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </TagInput>
            </div>
          </div>

          <div className="px-2 py-2 flex gap-4 justify-center w-full mt-4">
            <Button
              type="button"
              intent={`secondary`}
              className="w-full"
              onClick={() => dispatch(setCloseModal("editMetadataForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button
              className="w-full"
              intent={`primary`}
              isLoading={result.isLoading}
            >
              <span className="inline-flex justify-center w-full">Confirm</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
