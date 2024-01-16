import { z } from "zod";
import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import { v4 as uuidv4 } from "uuid";
import Layout from "@/comps/Layout";
import { TextInput } from "@ui/Forms/Inputs";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setRows } from "@/state/slices/metadataSlice";
import { setCloseModal } from "@/state/slices/uiSlice";

import { HiX } from "react-icons/hi";
import { useCallback, useState } from "react";
import { TagInput } from "@/comps/ui/Forms/Inputs/Inputs";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useAddMetadataMutation } from "@/api/resources/metadata";

const schema = z.object({
  property: z.string().optional(),
  sample_value: z.string().optional(),
  property_type: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type ITag = {
  id: string;
  name: string;
  status: string;
};

export default function AddMetaDataForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [tags, setTags] = useState<ITag[]>([]);
  const [visibility, setVisibility] = useState("");
  const [addMetadata, result] = useAddMetadataMutation();
  const metadataState = useAppSelector((state) => state.metadata);

  const form = useZodForm({
    schema: schema,
  });

  const handleTagChange = useCallback(
    (tag: string) => {
      setTags([
        ...tags,
        {
          name: tag,
          id: uuidv4(),
          status: "Pending",
        },
      ]);
    },
    [tags]
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (visibility === "") {
      showAlert("Please select a visibility", "error");
      return;
    }

    if (tags.length === 0) {
      showAlert("Please enter at least one tag", "error");
      return;
    }

    dispatch(
      setRows([
        ...metadataState.rows,
        {
          ...data,
          visibility,
          tags: tags,
          last_updated: new Date().toLocaleDateString(),
        },
      ])
    );

    form.reset();
    dispatch(setCloseModal("addMetadataForm"));
    showAlert("Metadata added successfully", "success");
  };

  const removeTagData = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Layout>
      <Form
        form={form}
        onSubmit={onSubmit}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        <div className="mx-auto bg-white p-8 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">
            Add Metadata
          </h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Metadata Name"}
                {...form.register("property")}
                placeholder={"Enter metadata name"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Enter Data Type"}
                placeholder={"Enter data type"}
                {...form.register("property_type")}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                defaultValue={"N/A"}
                label={"Sample Value"}
                {...form.register("sample_value")}
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
                label="Metadata Tags (Type and press enter to add)"
                onTagsChange={handleTagChange}
                tags={tags.map((tag) => tag.name)}
              >
                <ul className={`flex flex-wrap w-auto flex-shrink`}>
                  {tags.map((tag, index) => (
                    <li
                      key={index}
                      className="flex justify-center items-center bg-green-100 text-green-700 rounded-md p-1 border border-green-700 mx-1 my-2"
                    >
                      <span className="text-sm">{tag.name}</span>
                      <span onClick={() => removeTagData(index)}>
                        <HiX className="cursor-pointer" />
                      </span>
                    </li>
                  ))}
                </ul>
              </TagInput>
            </div>
          </div>

          <div className="px-2 py-2 flex gap-4 justify-center w-full mt-4">
            <Button
              type="button"
              className="w-full"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("addMetadataForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button
              className="w-full"
              intent={`primary`}
              isLoading={result.isLoading}
            >
              <span className="inline-flex justify-center w-full">Add</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
