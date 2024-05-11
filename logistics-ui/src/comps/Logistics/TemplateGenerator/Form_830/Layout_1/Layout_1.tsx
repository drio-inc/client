import { newForecast } from "../../constants";
import { useState, useEffect } from "react";
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

  return (
    <table className="w-full border-2 border-black">
      <thead>
        <tr className="custom-table-row">
          <th className="add-padding">Volex Item #</th>
          <th className="add-padding">Item Description</th>
          <th className="add-padding">UOM</th>
        </tr>
      </thead>

      {items?.map((item, index: number) => (
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
                          <td key={index} contentEditable className="inner-table add-padding">
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

const Layout_1 = ({ items, setItems }: RenderTableProps): JSX.Element => {
  return (
    <>
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

      <RenderTable items={items} setItems={setItems} />
    </>
  );
};

export default Layout_1;
