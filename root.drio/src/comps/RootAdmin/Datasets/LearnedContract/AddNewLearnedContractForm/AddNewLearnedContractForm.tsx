import { z } from "zod";
import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import { v4 as uuidv4 } from "uuid";
import Layout from "@/comps/Layout";
import { TextInput } from "@ui/Forms/Inputs";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { setRows } from "@/state/slices/learnedContractSlice";
import { setCloseModal } from "@/state/slices/uiSlice";

import { HiX } from "react-icons/hi";
import { useCallback, useState } from "react";
import { TagInput } from "@/comps/ui/Forms/Inputs/Inputs";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useAddLearnedContractMutation } from "@/api/resources/learned-contract";

const schema = z.object({
  property: z.string().optional(),
  sample_value: z.string().optional(),
  property_type: z.string().optional(),
  enhanced_property_type: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type ITag = {
  id: string;
  name: string;
  status: string;
  addedByUser?: boolean;
};

export default function AddLearnedContractForm({ row }: TableRow) {
  const dispatch = useAppDispatch();
  const [visibility, setVisibility] = useState("");
  const [keyNameTags, setKeyNameTags] = useState<ITag[]>([]);
  const [dataFieldTags, setDataFieldTags] = useState<ITag[]>([]);
  const [addLearnedContract, result] = useAddLearnedContractMutation();
  const learnedContractState = useAppSelector((state) => state.learnedContract);

  const form = useZodForm({
    schema: schema,
  });

  const handleKeyNameTagChange = useCallback(
    (tag: string) => {
      setKeyNameTags([
        ...keyNameTags,
        {
          name: tag,
          id: uuidv4(),
          status: "Pending",
          addedByUser: true,
        },
      ]);
    },
    [keyNameTags]
  );

  const handleDataFieldTagChange = useCallback(
    (tag: string) => {
      setDataFieldTags([
        ...dataFieldTags,
        {
          name: tag,
          id: uuidv4(),
          status: "Pending",
          addedByUser: true,
        },
      ]);
    },
    [dataFieldTags]
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (visibility === "") {
      showAlert("Please select a visibility", "error");
      return;
    }

    if (keyNameTags.length === 0) {
      showAlert("Please enter at least one key name tag", "error");
      return;
    }

    if (dataFieldTags.length === 0) {
      showAlert("Please enter at least one data field tag", "error");
      return;
    }

    dispatch(
      setRows([
        ...learnedContractState.rows,
        {
          ...data,
          visibility,
          optional: true,
          is_list: false,
          key_name_tags: keyNameTags,
          data_field_tags: dataFieldTags,
          last_updated: new Date().toLocaleDateString(),
        },
      ])
    );

    form.reset();
    dispatch(setCloseModal("addLearnedContractForm"));
    showAlert("Entity added successfully", "success");
  };

  const removeTagData = (tagType: string, indexToRemove: number) => {
    if (tagType === "key_name_tags") {
      setKeyNameTags(keyNameTags.filter((_, index) => index !== indexToRemove));
    } else if (tagType === "data_field_tags") {
      setDataFieldTags(dataFieldTags.filter((_, index) => index !== indexToRemove));
    } else {
      return;
    }
  };

  return (
    <Layout>
      <Form
        form={form}
        onSubmit={onSubmit}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
      >
        <div className="mx-auto bg-white p-8 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">Add Entity</h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Entity Name"}
                {...form.register("property")}
                placeholder={"Enter entity name"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Enter Basic Data Type"}
                placeholder={"Enter data type"}
                {...form.register("property_type")}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                placeholder={"Enter data type"}
                label={"Enter Enhanced Data Type"}
                className="md:text-sm 2xl:text-base"
                {...form.register("enhanced_property_type")}
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

            <h3 className="px-4 inline-block text-gray-700 text-sm font-medium">Set Visibility</h3>

            <div className="px-4 py-2 w-full">
              <RadioGroup.Root
                value={visibility}
                aria-label="Set Visibility"
                onValueChange={setVisibility}
                className="flex flex-wrap gap-2 w-full"
              >
                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r1"
                    value="internal"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label htmlFor="r1" className="text-gray-500 text-sm font-medium">
                    Internal
                  </label>
                </div>

                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r2"
                    value="hidden"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label className="text-gray-500 text-sm font-medium" htmlFor="r2">
                    Hidden
                  </label>
                </div>

                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r2"
                    value="public"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label className="text-gray-500 text-sm font-medium" htmlFor="r2">
                    Public
                  </label>
                </div>

                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r2"
                    value="randomize"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label className="text-gray-500 text-sm font-medium" htmlFor="r2">
                    Randomize
                  </label>
                </div>

                <div className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    id="r2"
                    value="hash"
                    className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                  />
                  <label className="text-gray-500 text-sm font-medium" htmlFor="r2">
                    Hash
                  </label>
                </div>
              </RadioGroup.Root>
            </div>

            <div className="px-4 py-2 w-full">
              <TagInput
                onTagsChange={handleKeyNameTagChange}
                tags={keyNameTags.map((tag) => tag.name)}
                label="Key Name Tags (Type and press enter to add)"
              >
                <ul className={`flex flex-wrap w-auto flex-shrink`}>
                  {keyNameTags.map((tag, index) => (
                    <li
                      key={index}
                      className="flex justify-center items-center bg-green-100 text-green-700 rounded-md p-1 border border-green-700 mx-1 my-2"
                    >
                      <span className="text-sm">{tag.name}</span>
                      <span onClick={() => removeTagData("key_name_tags", index)}>
                        <HiX className="cursor-pointer" />
                      </span>
                    </li>
                  ))}
                </ul>
              </TagInput>
            </div>

            <div className="px-4 py-2 w-full">
              <TagInput
                onTagsChange={handleDataFieldTagChange}
                tags={dataFieldTags.map((tag) => tag.name)}
                label="Data Field Tags (Type and press enter to add)"
              >
                <ul className={`flex flex-wrap w-auto flex-shrink`}>
                  {dataFieldTags.map((tag, index) => (
                    <li
                      key={index}
                      className="flex justify-center items-center bg-green-100 text-green-700 rounded-md p-1 border border-green-700 mx-1 my-2"
                    >
                      <span className="text-sm">{tag.name}</span>
                      <span onClick={() => removeTagData("data_field_tags", index)}>
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
              onClick={() => dispatch(setCloseModal("addLearnedContractForm"))}
            >
              <span className="inline-flex justify-center w-full">Cancel</span>
            </Button>

            <Button className="w-full" intent={`primary`} isLoading={result.isLoading}>
              <span className="inline-flex justify-center w-full">Add</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}
