/* eslint-disable react/no-unescaped-entities */
import Layout_1 from "./Layout_1";
import { v4 as uuid } from "uuid";
import html2canvas from "html2canvas";
import Button from "@/comps/ui/Button";
import { faker } from "@faker-js/faker";
import ReactToPrint from "react-to-print";
import { HiXMark } from "react-icons/hi2";
import { useRef, useState } from "react";
import { useAppDispatch } from "@/hooks/useStoreTypes";

import {
  Select,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@ui/Select";

import { uomEnum } from "../constants";
import EDI_810_Layout_1 from "@data/edi_810_layout_1.json";

import Modal from "@/comps/ui/Modal";
import showAlert from "@/comps/ui/Alert/Alert";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

const pageStyle = `
    @page {
	  size: A4;
	  margin: 0;
	}

	@media print {
	  body {
		margin: 10px;
		font-family: sans-serif;
	  }
	  

	
	  h1{
		font-size: 1.5rem;
	  }

	  .edi-830-layout-1-root{
		width: 100%;
		position: relative;
	  }

	  .full-border{
		border: 2px solid black;
	  }

	  .edi-830-layout-1-top-header-container{
		width: 100%;
		display: flex;
		justify-content: space-between;
	  }

	  .edi-830-layout-1-top-header-image{
		width: 200px;
		height: 200px;
		position:relative;
	  }

	  .edi-830-layout-1-top-header-image img{
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
	  }

	  .edi-830-layout-1-top-header-content-wrapper{
		display: flex;
		align-items: flex-end;
		flex-direction: column;
	  }

	  .edi-830-layout-1-top-header-content-pair{
		display: flex;
		align-items: flex-end;
		flex-direction: column;
	  }

	  .edi-830-layout-1-top-header-content-pair-header{
		font-weight: bold;
	  }

	  .edi-830-layout-1-bottom-header{
		display: flex;
		margin: 1rem 0;
		row-gap: 0.5rem;
		flex-direction: column;
	  }

	  .edi-830-layout-1-bottom-header-pair-header{
		font-weight: bold;
	  }

	  .edi-830-layout-1-table-1{
		width: 100%;
		margin: 32px 0;
		border-collapse: collapse;
	  }

	  .edi-830-layout-1-table-1 th,
	  .edi-830-layout-1-table-1 td{
		padding: 8px;
		border: 2px solid black;
	  }

	  .edi-830-layout-1-table-2{
		width: 100%;
		border: 2px solid black;
		border-collapse: collapse;
		
	  }

	  .edi-830-layout-1-table-2 th{
		padding: 8px;
		border: 2px solid black;
		page-break-inside: avoid;
		
	  }

	  .edi-830-layout-1-table-2-parent td{
		padding: 8px;
		page-break-inside: avoid;
		border: 2px solid black;
	  }

	  .edi-830-layout-1-footer{
		font-size: 8px;
		margin-top: 4px;
		position: absolute;
		display: inline-block;  

	  }
	}
	  `;

const Form_810 = () => {
  const dispatch = useAppDispatch();
  const printRef = useRef<HTMLDivElement | null>(null);
  const [templateLayout, setTemplateLayout] = useState("Layout 1");
  const [layoutOneItems, setLayoutOneItems] = useState(EDI_810_Layout_1);

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

  const randomLayoutOneTemplate = {
    id: uuid(),
    "Buyer's Part #": faker.string.numeric({ length: 6 }),
    "Vendor Item #": faker.string.numeric({ length: 6 }),
    Description: {
      "Grainger PO #": faker.string.numeric({ length: 6 }),
      "Shipping Cost Description": faker.helpers.arrayElement([
        "Freight Charge",
        "Delivery Charge",
        "Express Shipping Fee",
        "Overnight Shipping Fee",
        "Standard Shipping Fee",
        "Handling Charge",
        "Packaging Fee",
        "Courier Charge",
        "Freight Surcharge",
        "Shipping Insurance Fee",
        "Fuel Surcharge",
        "Customs Handling Fee",
        "Expedited Shipping Charge",
        "Logistics Service Fee",
        "Pallet Fee",
      ]),
    },
    Qty: faker.number.int({ min: 1, max: 10 }),
    UOM: faker.helpers.arrayElement(uomEnum),
    Price: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  };

  const addLineItem = () => {
    if (templateLayout === "Layout 1") {
      setLayoutOneItems((prev) => [
        ...prev,
        {
          ...randomLayoutOneTemplate,
          "Line #": `#${prev.length + 1}`,
          Amount: randomLayoutOneTemplate.Qty * randomLayoutOneTemplate.Price,
        },
      ]);
    }
  };

  const removeVolexItem = (index: number) => {
    if (templateLayout === "Layout 1") {
      setLayoutOneItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const randomizeEverything = () => {
    if (templateLayout === "Layout 1") {
      setLayoutOneItems((prev) =>
        prev.map((item) => {
          const randomLayoutOneTemplateV2 = {
            "Buyer's Part #": faker.string.numeric({ length: 6 }),
            "Vendor Item #": faker.string.numeric({ length: 6 }),
            Description: {
              "Grainger PO #": faker.string.numeric({ length: 6 }),
              "Shipping Cost Description": faker.helpers.arrayElement([
                "Freight Charge",
                "Delivery Charge",
                "Express Shipping Fee",
                "Overnight Shipping Fee",
                "Standard Shipping Fee",
                "Handling Charge",
                "Packaging Fee",
                "Courier Charge",
                "Freight Surcharge",
                "Shipping Insurance Fee",
                "Fuel Surcharge",
                "Customs Handling Fee",
                "Expedited Shipping Charge",
                "Logistics Service Fee",
                "Pallet Fee",
              ]),
            },

            Qty: faker.number.int({ min: 1, max: 10 }),
            UOM: faker.helpers.arrayElement(uomEnum),
            Price: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
          };

          return {
            ...item,
            ...randomLayoutOneTemplateV2,
            Amount: randomLayoutOneTemplateV2.Qty * Number(randomLayoutOneTemplateV2.Price),
          };
        })
      );
    }
  };

  const layouts = [
    {
      id: "Layout 1",
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
                copyStyles={false}
                pageStyle={pageStyle}
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
        ) : null}
      </div>
    </div>
  );
};

export default Form_810;
