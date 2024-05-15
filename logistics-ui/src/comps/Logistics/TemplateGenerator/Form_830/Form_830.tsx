/* eslint-disable react/no-unescaped-entities */
import { v4 as uuid } from "uuid";
import html2canvas from "html2canvas";
import Button from "@/comps/ui/Button";
import { faker } from "@faker-js/faker";
import ReactToPrint from "react-to-print";
import { HiXMark } from "react-icons/hi2";
import { useRef, useState } from "react";
import { useAppDispatch } from "@/hooks/useStoreTypes";

import Layout_1 from "./Layout_1";
import Layout_2 from "./Layout_2";

import {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@ui/Select";

import EDI_830_Layout_1 from "@data/edi_830_layout_1.json";
import EDI_830_Layout_2 from "@data/edi_830_layout_2.json";

import {
  uomEnum,
  forecastCodeEnum,
  warehouseLocationIdEnum,
  intervalGroupingOfForecastEnum,
} from "../constants";

import Modal from "@/comps/ui/Modal";
import showAlert from "@/comps/ui/Alert/Alert";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

const Form_830 = () => {
  const dispatch = useAppDispatch();
  const printRef = useRef<HTMLDivElement | null>(null);
  const [templateLayout, setTemplateLayout] = useState("Layout 1");

  const [layoutOneItems, setLayoutOneItems] = useState(EDI_830_Layout_1);
  const [layoutTwoItems, setLayoutTwoItems] = useState(EDI_830_Layout_2);

  const handleDownloadImage = async () => {
    const documentToPrint = document.getElementById("documentToPrint");
    if (!documentToPrint) return;

    const canvas = await html2canvas(documentToPrint as HTMLDivElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpeg";
      document.body.appendChild(link);

      link.click();
      document.body.removeChild(link);
      showAlert("Image Downloaded Successfully", "success");
    } else {
      window.open(data);
    }
  };

  const randomLayoutTwoTemplate = {
    id: uuid(),

    "Line #": faker.string.numeric({ length: 5 }),
    "Buyer's Part Number": `${faker.number.int({ min: 100000, max: 999999 })} - ${faker.number.int({
      min: 10,
      max: 99,
    })} - ${faker.string.alpha().toUpperCase()}`,

    "Unit Detail": {
      "Composite Unit of Measure": faker.helpers.arrayElement(uomEnum),
    },

    "Contact Information": {
      "Contact Function Code": faker.helpers.arrayElement(["SA", "SE", "SU"]),
      Name: faker.person.fullName(),
      Telephone: faker.phone.number(),
    },

    "Forecast Schedule": Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      id: uuid(),
      Quantity: faker.number.int({ min: 100, max: 800 }).toString(),
      "Forecast Qualifier": faker.helpers.arrayElement(forecastCodeEnum),
      "Timing Qualifier": faker.helpers.arrayElement(intervalGroupingOfForecastEnum),
      Date: faker.date.past().toLocaleDateString("en-US"),
    })),
  };

  const addLineItem = () => {
    const randomLayoutOneTemplate = {
      id: uuid(),
      volex_item: faker.string.numeric({ length: 6 }),
      item_description: faker.helpers.arrayElement(['3" Widget', '4" Widget', '5" Sprocket']),
      uom: faker.helpers.arrayElement(uomEnum),
      forecast_information: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
        id: uuid(),
        forecast_code: faker.helpers.arrayElement(
          forecastCodeEnum.filter((code) => code !== "Firm")
        ),
        interval_grouping_of_forecast: faker.helpers.arrayElement(intervalGroupingOfForecastEnum),
        qty: faker.number.int({ min: 1, max: 1000 }),
        forecast_date_load: faker.date.past().toLocaleDateString("en-US"),
        warehouse_location_id: faker.helpers.arrayElement(warehouseLocationIdEnum),
      })),
    };

    const forecastInformation = randomLayoutOneTemplate.forecast_information;
    forecastInformation[0].forecast_code = "Firm";

    randomLayoutOneTemplate.forecast_information = forecastInformation;

    if (templateLayout === "Layout 1") {
      setLayoutOneItems((prev) => [...prev, randomLayoutOneTemplate]);
    } else {
      setLayoutTwoItems((prev) => [...prev, randomLayoutTwoTemplate]);
    }
  };

  const removeVolexItem = (index: number) => {
    if (templateLayout === "Layout 1") {
      setLayoutOneItems((prev) => prev.filter((_, i) => i !== index));
    } else {
      setLayoutTwoItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const randomizeEverything = () => {
    if (templateLayout === "Layout 1") {
      setLayoutOneItems((prev) =>
        prev.map((item) => ({
          ...item,
          volex_item: faker.string.numeric({ length: 6 }),
          item_description: faker.helpers.arrayElement(['3" Widget', '4" Widget', '5" Sprocket']),
          uom: faker.helpers.arrayElement(uomEnum),
          forecast_information: item.forecast_information.map((forecast, index) => ({
            id: uuid(),
            forecast_code:
              index === 0
                ? forecast.forecast_code
                : faker.helpers.arrayElement(forecastCodeEnum.filter((code) => code !== "Firm")),
            interval_grouping_of_forecast: faker.helpers.arrayElement(
              intervalGroupingOfForecastEnum
            ),
            qty: faker.number.int({ min: 100, max: 800 }),
            forecast_date_load: faker.date.past().toLocaleDateString("en-US"),
            warehouse_location_id: faker.helpers.arrayElement(warehouseLocationIdEnum),
          })),
        }))
      );
    } else {
      setLayoutTwoItems((prev) =>
        prev.map((item) => ({
          id: uuid(),

          "Line #": faker.string.numeric({ length: 5 }),
          "Buyer's Part Number": `${faker.number.int({
            min: 100000,
            max: 999999,
          })} - ${faker.number.int({
            min: 10,
            max: 99,
          })} - ${faker.string.alpha().toUpperCase()}`,

          "Unit Detail": {
            "Composite Unit of Measure": faker.helpers.arrayElement(uomEnum),
          },

          "Contact Information": {
            "Contact Function Code": faker.helpers.arrayElement(["SA", "SE", "SU"]),
            Name: faker.person.fullName(),
            Telephone: faker.phone.number(),
          },

          "Forecast Schedule": item["Forecast Schedule"].map(() => ({
            id: uuid(),
            Quantity: faker.number.int({ min: 100, max: 800 }).toString(),
            "Forecast Qualifier": faker.helpers.arrayElement(forecastCodeEnum),
            "Timing Qualifier": faker.helpers.arrayElement(intervalGroupingOfForecastEnum),
            Date: faker.date.past().toLocaleDateString("en-US"),
          })),
        }))
      );
    }
  };

  const layouts = [
    {
      id: "Layout 1",
    },
    {
      id: "Layout 2",
    },
  ];

  const handleLayoutChange = (layout: string) => {
    setTemplateLayout(layout);
  };

  return (
    <div>
      <div className="flex items-center gap-x-4 mb-8">
        <Select defaultValue={layouts[0].id} onValueChange={(option) => handleLayoutChange(option)}>
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue defaultValue={layouts[0].id} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {layouts.map((layout) => (
                <SelectItem key={layout.id} value={layout.id}>
                  {layout.id}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button intent={"primary"} onClick={() => dispatch(setOpenModal("printDocumentPopup"))}>
          Print Document
        </Button>

        <Button onClick={addLineItem}>Add Item</Button>

        <Button onClick={() => removeVolexItem(layoutOneItems.length - 1)}>
          Remove Latest Item
        </Button>

        <Button onClick={randomizeEverything}>Randomize Everything</Button>
      </div>

      <div className="hidden">
        <Modal identifier="printDocumentPopup">
          <div className="relative mx-auto bg-white p-8 rounded-lg w-[400px]">
            <div className="flex justify-between">
              <h2 className="text-gray-700 text-2xl font-bold">Select a Print Option</h2>

              <HiXMark
                onClick={() => dispatch(setCloseModal("printDocumentPopup"))}
                className="text-gray-700 hover:text-drio-red-dark w-10 h-10 cursor-pointer"
              />
            </div>

            <div className="flex gap-x-2 justify-center w-full mt-4">
              <Button
                type="button"
                className="w-full"
                intent={`primary`}
                onClick={handleDownloadImage}
              >
                <span className="inline-flex justify-center w-full">Print JPEG</span>
              </Button>

              <ReactToPrint
                content={() => printRef.current}
                trigger={() => <Button className="w-full">Print PDF</Button>}
                onAfterPrint={() => showAlert("PDF Downloaded Successfully", "success")}
              />
            </div>
          </div>
        </Modal>
      </div>

      <div className="bg-white p-4" ref={printRef} id="documentToPrint">
        {templateLayout === "Layout 1" ? (
          <Layout_1 items={layoutOneItems} setItems={setLayoutOneItems} />
        ) : (
          <Layout_2 items={layoutTwoItems} setItems={setLayoutTwoItems} />
        )}
      </div>
    </div>
  );
};

export default Form_830;
