/* eslint-disable react/no-unescaped-entities */
import { v4 as uuid } from "uuid";
import html2canvas from "html2canvas";
import Button from "@/comps/ui/Button";
import { faker } from "@faker-js/faker";
import ReactToPrint from "react-to-print";
import { HiXMark } from "react-icons/hi2";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/hooks/useStoreTypes";

import EDI830 from "./edi_830.json";

import {
  uomEnum,
  newForecast,
  forecastCodeEnum,
  warehouseLocationIdEnum,
  intervalGroupingOfForecastEnum,
} from "./constants";

import Modal from "@/comps/ui/Modal";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import showAlert from "@/comps/ui/Alert/Alert";

type RenderTableProps = {
  data: TemplateBody[];
  setItems: React.Dispatch<React.SetStateAction<TemplateBody[]>>;
};

const RenderTable = ({ data, setItems }: RenderTableProps): JSX.Element => {
  const [forecastId, setForecaseId] = useState<string>("");

  useEffect(() => {
    if (forecastId) {
      setItems((prev) => prev.filter((p) => p.id !== forecastId));
      setForecaseId("");
    }
  }, [forecastId, setItems]);

  const deleteForecast = (id: string, index: number) => {
    setItems((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          if (p.forecast_information.length === 1) {
            setForecaseId(id);
            return p;
          }

          return {
            ...p,
            forecast_information: p.forecast_information.filter((_, i) => i !== index),
          };
        }

        return p;
      })
    );
  };

  const addForecast = (id: string) => {
    setItems((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            forecast_information: [...p.forecast_information, newForecast],
          };
        }

        return p;
      })
    );
  };

  return (
    <table className="w-full border-2 border-black">
      <thead>
        <tr className="custom-table-row">
          <th className="add-padding">Volex Item #</th>
          <th className="add-padding">Item Description</th>
          <th className="add-padding">UOM</th>
        </tr>
      </thead>

      {data?.map((item, index: number) => (
        <>
          <tr key={index} className="outer-table-row">
            <td contentEditable className="add-padding">
              {item.volex_item}
            </td>
            <td contentEditable className="add-padding">
              {item.item_description}
            </td>
            <td contentEditable className="add-padding">
              {item.uom}
            </td>
          </tr>

          <tr>
            <td colSpan={3}>
              <table className="w-[95%] ml-auto">
                <tr className="custom-table-row">
                  <th className="add-padding">Forecast Code</th>
                  <th className="add-padding">Interval Grouping of Forecast</th>
                  <th className="add-padding">Qty</th>
                  <th className="add-padding">Forecast Date Load</th>
                  <th className="add-padding">Warehouse Location ID</th>
                </tr>

                {item?.forecast_information?.map((forecast, index: number) => (
                  <tr
                    id={forecast.id}
                    key={forecast.id}
                    className="relative custom-table-row"
                    onMouseEnter={(e) => {
                      // Show he Hidden Icons
                      const icons = e.currentTarget.querySelector("span");
                      icons?.classList.remove("hidden");
                      icons?.classList.add("flex");
                    }}
                    onMouseLeave={(e) => {
                      // Hide the Hidden Icons
                      const icons = e.currentTarget.querySelector("span");
                      icons?.classList.add("hidden");
                      icons?.classList.remove("flex");
                    }}
                  >
                    {Object.values(forecast).map((value, index) => (
                      <>
                        {index > 0 && (
                          <td key={index} contentEditable className="add-padding">
                            {value}
                          </td>
                        )}
                      </>
                    ))}

                    <span className="hidden absolute -bottom-6 -right-8 p-2">
                      <HiMinus
                        className="cursor-pointer w-8 h-8"
                        onClick={() => deleteForecast(item.id, index)}
                      />

                      <HiPlus
                        className="cursor-pointer w-8 h-8"
                        onClick={() => addForecast(item.id)}
                      />
                    </span>
                  </tr>
                )) || null}
              </table>
            </td>
          </tr>
        </>
      )) || null}
    </table>
  );
};

const TemplateGenerator = () => {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState(EDI830);
  const printRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadImage = async () => {
    const documentToPrint = document.getElementById("documentToPrint");
    if (!documentToPrint) return;

    documentToPrint.querySelectorAll(".add-padding").forEach((el) => {
      el.classList.add("pb-4");
    });

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

    documentToPrint.querySelectorAll(".add-padding").forEach((el) => {
      el.classList.remove("pb-4");
    });
  };

  const randomTemplate = {
    id: uuid(),
    volex_item: faker.string.numeric({ length: 6 }),
    item_description: faker.helpers.arrayElement(['3" Widget', '4" Widget', '5" Sprocket']),
    uom: faker.helpers.arrayElement(uomEnum),
    forecast_information: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      id: uuid(),
      forecast_code: faker.helpers.arrayElement(forecastCodeEnum),
      interval_grouping_of_forecast: faker.helpers.arrayElement(intervalGroupingOfForecastEnum),
      qty: faker.number.int({ min: 100, max: 800 }),
      forecast_date_load: faker.date.past().toLocaleDateString("en-US"),
      warehouse_location_id: faker.helpers.arrayElement(warehouseLocationIdEnum),
    })),
  };

  const addVolexItem = () => {
    setItems((prev) => [...prev, randomTemplate]);
  };

  const removeVolexItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const randomizeEverything = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        volex_item: faker.string.numeric({ length: 6 }),
        item_description: faker.helpers.arrayElement(['3" Widget', '4" Widget', '5" Sprocket']),
        uom: faker.helpers.arrayElement(uomEnum),
        forecast_information: item.forecast_information.map(() => ({
          id: uuid(),
          forecast_code: faker.helpers.arrayElement(forecastCodeEnum),
          interval_grouping_of_forecast: faker.helpers.arrayElement(intervalGroupingOfForecastEnum),
          qty: faker.number.int({ min: 100, max: 800 }),
          forecast_date_load: faker.date.past().toLocaleDateString("en-US"),
          warehouse_location_id: faker.helpers.arrayElement(warehouseLocationIdEnum),
        })),
      }))
    );
  };

  return (
    <div>
      <Button intent={"primary"} onClick={() => dispatch(setOpenModal("printDocumentPopup"))}>
        Print Document
      </Button>

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

      <Button onClick={addVolexItem} className="ml-4 mb-8">
        Add Item
      </Button>

      <Button onClick={() => removeVolexItem(items.length - 1)} className="ml-4 mb-8">
        Remove Latest Item
      </Button>

      <Button onClick={randomizeEverything} className="ml-4 mb-8">
        Randomize Everything
      </Button>

      <div className="bg-white p-4" ref={printRef} id="documentToPrint">
        <div className="flex flex-col items-end p-4 gap-y-1">
          <h1 className="text-3xl font-semibold">Planning Schedule with Release Capacity</h1>

          <h5>Set Purpose Code</h5>
          <h5 contentEditable>Mutually Defined</h5>

          <h5>Reference ID</h5>
          <h5 contentEditable>1514893</h5>

          <div className="mt-4">
            <h5 className="font-bold">Start Date</h5>
            <h5 contentEditable>6/16/2020</h5>
          </div>
        </div>

        <div className="flex flex-col p-4 gap-y-1 my-4">
          <h5 className="font-bold">Carrier</h5>
          <h5>
            Code: <span contentEditable>USPN</span>
          </h5>

          <h5 className="font-bold">Ship To</h5>
          <h5 contentEditable className="w-fit">
            DC #1A
          </h5>

          <h5>
            Code: <span contentEditable>043849</span>
          </h5>
        </div>

        <table className="w-full my-4">
          <thead>
            <tr className="custom-table-row">
              <th className="add-padding">Schedule Type</th>
              <th className="add-padding">Schedule Qty Code</th>
              <th className="add-padding">Supplier Code</th>
            </tr>
          </thead>

          <tr className="custom-table-row">
            <td contentEditable className="add-padding">
              Planned Shipment Based
            </td>
            <td contentEditable className="add-padding">
              Actual Discrete Quantities
            </td>
            <td contentEditable className="add-padding">
              434
            </td>
          </tr>
        </table>

        <RenderTable data={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default TemplateGenerator;
