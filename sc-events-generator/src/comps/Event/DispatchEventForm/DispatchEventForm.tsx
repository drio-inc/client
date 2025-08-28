import { number, z } from "zod";
import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    console.log("DispatchEventForm onSubmit", data);

    try {
      const res = await publish({ query: data.event }).unwrap();

      //   const res: EventResponse = {
      //     run_id: "22df0a6a-a0fe-4053-9105-d9d3f99879ac",
      //     result: {
      //       emergency_diffuser: {
      //         number_of_affected_nodes: 62,
      //         affected_nodes: [
      //           {
      //             name: "Guangzhou",
      //             labels: "y",
      //           },
      //           {
      //             name: "HOP LUN (HK) LTD_F7",
      //             labels: "factory",
      //           },
      //           {
      //             name: "SUZHOU MARCONI GARMENT FACTORY CO.,LTD._F13",
      //             labels: "factory",
      //           },
      //           {
      //             name: "BRA PRO LIMITED_F4",
      //             labels: "factory",
      //           },
      //           {
      //             name: "SHANGHAI JINGRONG SCIENCE &  TECHNOLOGY CO., LTD._F6",
      //             labels: "factory",
      //           },
      //           {
      //             name: "PT TPINC TRADING JAKARTA_F16",
      //             labels: "factory",
      //           },
      //           {
      //             name: "TIANHAI LACE CO., LTD_F1",
      //             labels: "factory",
      //           },
      //           {
      //             name: "NINGBO SEDUNO IMP & EXP CO.LTD_F12",
      //             labels: "factory",
      //           },
      //           {
      //             name: "SUZHOU LAOHONG KNITTING GARMENT CO.,LTD._F7",
      //             labels: "factory",
      //           },
      //           {
      //             name: "PT TPINC TRADING JAKARTA_F20",
      //             labels: "factory",
      //           },
      //           {
      //             name: "ZHEJIANG MENGNA KNITTING CO., LTD_F21",
      //             labels: "factory",
      //           },
      //           {
      //             name: "UNIVERSAL LINGERIE SOURCING LTD_F3",
      //             labels: "factory",
      //           },
      //           {
      //             name: "BEIJING TOPNEW IMPORT & EXPORT CO., LTD_F20",
      //             labels: "factory",
      //           },
      //           {
      //             name: "GOLD STAR FASHION LIMITED_F19",
      //             labels: "factory",
      //           },
      //           {
      //             name: "HANGZHOU SUNTEX IMP&EXP CORP.LTD_F15",
      //             labels: "factory",
      //           },
      //           {
      //             name: "AVERY DENNISON_F8",
      //             labels: "factory",
      //           },
      //           {
      //             name: "HIGH FASHION (CHINA) CO., LTD_F13",
      //             labels: "factory",
      //           },
      //           {
      //             name: "LONG CHANG (PANYU PLANT) CO., LTD._F3",
      //             labels: "factory",
      //           },
      //           {
      //             name: "CRYSTAL MARTIN (HONG KONG) LTD_F11",
      //             labels: "factory",
      //           },
      //           {
      //             name: "CRYSTAL MARTIN (HONG KONG) LTD_F10",
      //             labels: "factory",
      //           },
      //           {
      //             name: "YUNHAN INTERNATIONAL (HK) LIMITED_F14",
      //             labels: "factory",
      //           },
      //           {
      //             name: "ZHEJIANG HEMPELZHI TEXTILE  TECHNOLOGY CO. LTD_F14",
      //             labels: "factory",
      //           },
      //           {
      //             name: "PT BUSANAREMAJA AGRACIPTA_F8",
      //             labels: "factory",
      //           },
      //           {
      //             name: "PT. SUMBER BINTANG REJEKI_F5",
      //             labels: "factory",
      //           },
      //           {
      //             name: "INTIMATE APPARELS LTD._F3",
      //             labels: "factory",
      //           },
      //           {
      //             name: "GAUNGZHOU JIN HONG YUAN LEATHER PRODUCT CO., LTD_F1",
      //             labels: "factory",
      //           },
      //           {
      //             name: "HANGZHOU JIAYI GARMENT COMPANY LTD_F13",
      //             labels: "factory",
      //           },
      //           {
      //             name: "SERENDIPITY INTERNATIONAL TRADING LTD._F22",
      //             labels: "factory",
      //           },
      //           {
      //             name: "YUNUSCO (BD) LIMITED_F3",
      //             labels: "factory",
      //           },
      //           {
      //             name: "GUANGZHOU YISETONG_F1",
      //             labels: "factory",
      //           },
      //           {
      //             name: "AVERY DENNISON_F2",
      //             labels: "factory",
      //           },
      //           {
      //             name: "KASHION INDUSTRY CO., LTD_F4",
      //             labels: "factory",
      //           },
      //           {
      //             name: "HOP LUN (HK) LTD",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "SUZHOU MARCONI GARMENT FACTORY CO.,LTD.",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "BRA PRO LIMITED",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "SHANGHAI JINGRONG SCIENCE &  TECHNOLOGY CO., LTD.",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "PT TPINC TRADING JAKARTA",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "TIANHAI LACE CO., LTD",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "NINGBO SEDUNO IMP & EXP CO.LTD",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "SUZHOU LAOHONG KNITTING GARMENT CO.,LTD.",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "ZHEJIANG MENGNA KNITTING CO., LTD",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "UNIVERSAL LINGERIE SOURCING LTD",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "BEIJING TOPNEW IMPORT & EXPORT CO., LTD",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "GOLD STAR FASHION LIMITED",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "HANGZHOU SUNTEX IMP&EXP CORP.LTD",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "AVERY DENNISON",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "HIGH FASHION (CHINA) CO., LTD",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "LONG CHANG (PANYU PLANT) CO., LTD.",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "CRYSTAL MARTIN (HONG KONG) LTD",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "YUNHAN INTERNATIONAL (HK) LIMITED",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "ZHEJIANG HEMPELZHI TEXTILE  TECHNOLOGY CO. LTD",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "PT BUSANAREMAJA AGRACIPTA",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "PT. SUMBER BINTANG REJEKI",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "INTIMATE APPARELS LTD.",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "GAUNGZHOU JIN HONG YUAN LEATHER PRODUCT CO., LTD",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "HANGZHOU JIAYI GARMENT COMPANY LTD",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "SERENDIPITY INTERNATIONAL TRADING LTD.",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "YUNUSCO (BD) LIMITED",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "GUANGZHOU YISETONG",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "KASHION INDUSTRY CO., LTD",
      //             labels: "supplier",
      //           },
      //           {
      //             name: "H&M",
      //             labels: "__Entity__",
      //           },
      //           {
      //             name: "Adidas",
      //             labels: "__Entity__",
      //           },
      //           {
      //             name: "Nike",
      //             labels: "__Entity__",
      //           },
      //         ],
      //         severity: "severe",
      //         emergency_type: "wildfire",
      //       },
      //     },
      //   };

      const transformedData = {
        event: data.event,
        run_id: res.run_id,
        occurence_time: new Date().toISOString(),
        severity: res.result.emergency_diffuser.severity,
        event_type: res.result.emergency_diffuser.emergency_type,
        location: res.result.emergency_diffuser.affected_nodes[0].name,
        number_of_affected_nodes: res.result.emergency_diffuser.number_of_affected_nodes,
      };

      if (res) {
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
