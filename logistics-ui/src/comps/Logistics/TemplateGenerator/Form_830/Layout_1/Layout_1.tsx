import Image from "next/image";
import showAlert from "@/comps/ui/Alert";
import { useState, useEffect } from "react";
import { newForecast } from "../../constants";
import { HiMinus, HiPlus } from "react-icons/hi";

type RenderTableProps = {
  items: EDI830LayoutOne[];
  setItems: React.Dispatch<React.SetStateAction<EDI830LayoutOne[]>>;
};

const RenderTable = ({ items, setItems }: RenderTableProps): JSX.Element => {
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

  const handleInputChange = (
    event: any,
    itemId: string,
    forecastIndex: number,
    key: string,
    value: string | number
  ) => {
    const newValue = event.target.innerText;

    if (newValue === "Firm" || newValue === "firm") {
      event.target.innerText = value;
      showAlert("More than one 'Firm' Forecast Code is not allowed", "error");
    } else {
      //   setItems((prev) =>
      //     prev.map((item, index) => {
      //       if (item.id === itemId) {
      //         const updatedForecasts = item.forecast_information.map((forecast, index) => {
      //           if (index === forecastIndex) {
      //             return { ...forecast, [key]: newValue };
      //           }
      //           return forecast;
      //         });
      //         return { ...item, forecast_information: updatedForecasts };
      //       }
      //       return item;
      //     })
      //   );
    }
  };

  return (
    <table className="w-full border-2 border-black edi-830-layout-1-table-2">
      <thead>
        <tr className="custom-table-row">
          <th>Volex Item #</th>
          <th>Item Description</th>
          <th>UOM</th>
        </tr>
      </thead>

      {items?.map((item, index: number) => (
        <>
          <tr key={index} className="outer-table-row edi-830-layout-1-table-2-parent">
            <td contentEditable>{item.volex_item}</td>
            <td contentEditable>{item.item_description}</td>
            <td contentEditable>{item.uom}</td>
          </tr>

          <tr>
            <td colSpan={3}>
              <table className="w-[95%] ml-auto edi-830-layout-1-table-2-nested">
                <tr className="custom-table-row">
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
                    {Object.entries(forecast).map(([key, value], fIndex) => (
                      <>
                        {fIndex > 0 && (
                          <td
                            key={index}
                            className={`inner-table add-padding ${
                              key !== "forecast_code" || index > 0
                                ? "cursor-text"
                                : "cursor-default"
                            }`}
                            contentEditable={key !== "forecast_code" || index > 0}
                            onInput={(e: React.FormEvent<HTMLTableCellElement>) =>
                              handleInputChange(e, item.id, fIndex, key, value)
                            }
                          >
                            {value}
                          </td>
                        )}
                      </>
                    ))}

                    <span className="hidden absolute -bottom-6 -right-8 p-2 edi-830-layout-1-table-2-nested-buttons">
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

const Layout_1 = ({ items, setItems }: RenderTableProps): JSX.Element => {
  return (
    <div className="w-full relative edi-830-layout-1-root">
      <div className="flex w-full justify-between edi-830-layout-1-top-header-container">
        <div className="relative w-[250px] h-[250px] edi-830-layout-1-top-header-image">
          <Image
            fill
            src="/acmemfg.png"
            alt={"Tesla Logo"}
            className="object-contain object-center w-full h-full"
          />
        </div>

        <div className="flex flex-col items-end p-4 gap-y-1 edi-830-layout-1-top-header-content-wrapper">
          <h1 className="text-3xl font-semibold">Planning Schedule with Release Capacity</h1>

          <div className="flex flex-col items-end edi-830-layout-1-top-header-content-pair">
            <span className=" edi-830-layout-1-top-header-content-pair-header">
              Set Purpose Code
            </span>
            <p contentEditable>Mutually Defined</p>
          </div>

          <span className="font-bold edi-830-layout-1-top-header-content-pair-header">
            Reference ID
          </span>
          <p contentEditable>1514893</p>

          <div className="mt-4">
            <span className="font-bold edi-830-layout-1-top-header-content-pair-header">
              Start Date
            </span>
            <p contentEditable>3/16/2024</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-4 gap-y-1 my-4 edi-830-layout-1-bottom-header">
        <span className="font-bold edi-830-layout-1-bottom-header-pair-header">Carrier</span>
        <span>
          Code: <span contentEditable>USPN</span>
        </span>

        <span className="font-bold edi-830-layout-1-bottom-header-pair-header">Ship To</span>
        <span contentEditable className="w-fit">
          DC #1A
        </span>

        <span>
          Code: <span contentEditable>043849</span>
        </span>
      </div>

      <table className="w-full my-4 edi-830-layout-1-table-1">
        <thead>
          <tr className="custom-table-row">
            <th>Schedule Type</th>
            <th>Schedule Qty Code</th>
            <th>Supplier Code</th>
          </tr>
        </thead>

        <tr className="custom-table-row">
          <td contentEditable>Planned Shipment Based</td>
          <td contentEditable>Actual Discrete Quantities</td>
          <td contentEditable>434</td>
        </tr>
      </table>

      <RenderTable items={items} setItems={setItems} />

      <span className="text-[8px] text-gray-500 absolute inline-block mt-1 edi-830-layout-1-footer">
        Created by Drio Inc.
      </span>
    </div>
  );
};

export default Layout_1;
