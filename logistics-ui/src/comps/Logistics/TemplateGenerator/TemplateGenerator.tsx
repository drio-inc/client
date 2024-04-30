/* eslint-disable react/no-unescaped-entities */
import { v4 as uuid } from "uuid";
import Button from "@/comps/ui/Button";
import { faker } from "@faker-js/faker";
import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { HiMinus, HiPlus } from "react-icons/hi";

import EDI830 from "./edi_830.json";

import {
  uomEnum,
  newForecast,
  forecastCodeEnum,
  warehouseLocationIdEnum,
  intervalGroupingOfForecastEnum,
} from "./constants";

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
        <tr className="table-row">
          <th>Volex Item #</th>
          <th>Item Description</th>
          <th>UOM</th>
        </tr>
      </thead>

      {data?.map((item, index: number) => (
        <>
          <tr key={index} className="outer-table">
            <td contentEditable>{item.volex_item}</td>
            <td contentEditable>{item.item_description}</td>
            <td contentEditable>{item.uom}</td>
          </tr>

          <tr>
            <td colSpan={3}>
              <table className="w-[95%] ml-auto">
                <tr className="table-row">
                  <th>Forecast Code</th>
                  <th>Interval Grouping of Forecast</th>
                  <th>Qty</th>
                  <th>Forecast Date Load</th>
                  <th>Warehouse Location ID</th>
                </tr>

                {item?.forecast_information?.map((forecast, index: number) => (
                  <tr
                    id={forecast.id}
                    key={forecast.id}
                    className="relative table-row"
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
                          <td key={index} contentEditable>
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
  const printRef = useRef(null);
  const [items, setItems] = useState(EDI830);

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
      <ReactToPrint
        content={() => printRef.current}
        trigger={() => <Button className="mb-8">Print Document</Button>}
      />

      <Button onClick={addVolexItem} className="ml-4 mb-8">
        Add Item
      </Button>

      <Button onClick={() => removeVolexItem(items.length - 1)} className="ml-4 mb-8">
        Remove Latest Item
      </Button>

      <Button onClick={randomizeEverything} className="ml-4 mb-8">
        Randomize Everything
      </Button>

      <div className="bg-white p-4" ref={printRef}>
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
            <tr className="table-row">
              <th>Schedule Type</th>
              <th>Schedule Qty Code</th>
              <th>Supplier Code</th>
            </tr>
          </thead>

          <tr className="table-row">
            <td contentEditable>Planned Shipment Based</td>
            <td contentEditable>Actual Discrete Quantities</td>
            <td contentEditable>434</td>
          </tr>
        </table>

        <RenderTable data={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default TemplateGenerator;
