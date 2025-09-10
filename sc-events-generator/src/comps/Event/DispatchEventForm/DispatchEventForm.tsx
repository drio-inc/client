import { number, z } from "zod";
import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { v4 as uuid } from "uuid";

import { v4 as uuiv4 } from "uuid";
import { setRows } from "@/state/slices/eventSlice";
import { usePublishEventMutation } from "@/api/events";
import { setCloseModal } from "@/state/slices/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/comps/ui/Forms/FormV2";

import { Textarea } from "@/comps/ui/Textarea";

import cn from "@/utils/cn";
import { EventResponse } from "@/api/events/types";

const schema = z.object({
  event: z.string({
    required_error: "Please enter event description",
  }),
});

type FormData = z.infer<typeof schema>;

const DispatchEventForm = () => {
  const dispatch = useAppDispatch();
  const [publish, result] = usePublishEventMutation();
  const eventState = useAppSelector((state) => state.event);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log("DispatchEventForm onSubmit", data);
      const res = await publish({ query: data.event }).unwrap();

      if (res) {
        const sourceCity = JSON.parse(res?.results[0])?.source_city!;
        const severity = JSON.parse(res?.results[res?.results.length - 1])?.severity!;
        const eventType = JSON.parse(res?.results[res?.results.length - 1])?.emergency_type!;

        const transformedData = {
          run_id: uuid(),
          event: data.event,
          severity: severity,
          location: sourceCity,
          event_type: eventType,
          occurence_time: new Date().toLocaleString("en-US", {
            timeZoneName: "short",
          }),
          number_of_affected_nodes: res.results.length - 3,
        };

        dispatch(setRows([...eventState.rows, transformedData]));

        dispatch(setCloseModal("dispatchEventForm"));
        showAlert("Event published successfully", "success");
      }
    } catch (err: any) {
      showAlert(err?.data?.message ?? "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className={"px-8 py-2 flex flex-col shadow-lg rounded-lg bg-white w-[800px]"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-wrap w-full mb-4"
        >
          <div className="pt-4">
            <h2 className="text-gray-700 text-2xl font-bold text-center">
              Generate News for Publishing
            </h2>
          </div>

          <div className="py-2 w-full">
            <FormField
              control={form.control}
              name="event"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea rows={6} {...field} placeholder="Type your news here." />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center gap-x-4 my-4">
            <Button
              type="button"
              intent={"secondary"}
              className="w-[164px]"
              onClick={() => dispatch(setCloseModal("dispatchEventForm"))}
            >
              Cancel
            </Button>
            <Button
              intent={"primary"}
              className="w-[164px]"
              disabled={result.isLoading}
              isLoading={result.isLoading}
            >
              Publish
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DispatchEventForm;
